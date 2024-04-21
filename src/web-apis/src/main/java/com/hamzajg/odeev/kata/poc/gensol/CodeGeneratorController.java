package com.hamzajg.odeev.kata.poc.gensol;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/generators")
public class CodeGeneratorController {

    @PostMapping()
    public ResponseEntity<Resource> generate(@RequestBody MetadataDto metadataDto) throws IOException {
        var targetType = "servers/" + metadataDto.settings.targetFramework;
        if(metadataDto.settings != null && metadataDto.settings.targetClientPlatformSettings != null)
            targetType = "clients/" + metadataDto.settings.targetClientPlatformSettings;
        RestTemplate restTemplate = new RestTemplate();
        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("openAPIUrl", "https://raw.githubusercontent.com/openapitools/openapi-generator/master/modules/openapi-generator/src/test/resources/3_0/petstore.yaml");
        Map<String, String> options = new HashMap<>();
        options.put("packageName", metadataDto.name);
        requestBody.put("options", options);
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.postForEntity("http://localhost:8080/api/gen/" + targetType, requestEntity, String.class);
        if (response.getStatusCode() == HttpStatus.OK) {
            String responseBody = response.getBody();
            ObjectMapper mapper = new ObjectMapper();
            MetadataDto.ResponseDto responseDto = mapper.readValue(responseBody, MetadataDto.ResponseDto.class);
            ResponseEntity<byte[]> responseStream = restTemplate.getForEntity(responseDto.link, byte[].class);
            if (responseStream.getStatusCode() == HttpStatus.OK) {
                Resource resource = new ByteArrayResource(responseStream.getBody());
                headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
                headers.setContentDisposition(ContentDisposition.attachment().filename(metadataDto.name + ".zip").build());
                return ResponseEntity.ok().headers(headers).body(resource);
            } else {
                return ResponseEntity.status(response.getStatusCode()).build();
            }
        } else {
            System.out.println("Error: " + response.getStatusCode());
        }
        return ResponseEntity.status(response.getStatusCode()).build();
    }

}