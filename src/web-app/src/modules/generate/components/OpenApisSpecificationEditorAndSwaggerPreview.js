import CodeEditor from "@uiw/react-textarea-code-editor";
import SwaggerUI from "swagger-ui-react";
import 'swagger-ui-react/swagger-ui.css';
import React, {useState} from "react";
import {Button} from "flowbite-react";
import {Utilities} from "../../../utilities/Utillties";

const OpenApisSpecificationEditorAndSwaggerPreview = () => {
    const [savedTo, setSavedTo] = useState();
    const [yamlValue, setYAMLValue] = useState('openapi: 3.0.0\n' +
        'servers:\n' +
        '  - url: \'http://petstore.swagger.io/v2\'\n' +
        'info:\n' +
        '  description: >-\n' +
        '    This is a sample server Petstore server. For this sample, you can use the api key\n' +
        '    `special-key` to test the authorization filters.\n' +
        '  version: 1.0.0\n' +
        '  title: OpenAPI Petstore\n' +
        '  license:\n' +
        '    name: Apache-2.0\n' +
        '    url: \'https://www.apache.org/licenses/LICENSE-2.0.html\'\n' +
        'tags:\n' +
        '  - name: pet\n' +
        '    description: Everything about your Pets\n' +
        '  - name: store\n' +
        '    description: Access to Petstore orders\n' +
        '  - name: user\n' +
        '    description: Operations about user\n' +
        'paths:\n' +
        '  /pet:\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Add a new pet to the store\n' +
        '      description: \'\'\n' +
        '      operationId: addPet\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Pet\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Pet\'\n' +
        '        \'405\':\n' +
        '          description: Invalid input\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'write:pets\'\n' +
        '            - \'read:pets\'\n' +
        '      requestBody:\n' +
        '        $ref: \'#/components/requestBodies/Pet\'\n' +
        '    put:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Update an existing pet\n' +
        '      description: \'\'\n' +
        '      operationId: updatePet\n' +
        '      externalDocs:\n' +
        '        url: "http://petstore.swagger.io/v2/doc/updatePet"\n' +
        '        description: "API documentation for the updatePet operation"\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Pet\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Pet\'\n' +
        '        \'400\':\n' +
        '          description: Invalid ID supplied\n' +
        '        \'404\':\n' +
        '          description: Pet not found\n' +
        '        \'405\':\n' +
        '          description: Validation exception\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'write:pets\'\n' +
        '            - \'read:pets\'\n' +
        '      requestBody:\n' +
        '        $ref: \'#/components/requestBodies/Pet\'\n' +
        '  /pet/findByStatus:\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Finds Pets by status\n' +
        '      description: Multiple status values can be provided with comma separated strings\n' +
        '      operationId: findPetsByStatus\n' +
        '      parameters:\n' +
        '        - name: status\n' +
        '          in: query\n' +
        '          description: Status values that need to be considered for filter\n' +
        '          required: true\n' +
        '          style: form\n' +
        '          explode: false\n' +
        '          deprecated: true\n' +
        '          schema:\n' +
        '            type: array\n' +
        '            items:\n' +
        '              type: string\n' +
        '              enum:\n' +
        '                - available\n' +
        '                - pending\n' +
        '                - sold\n' +
        '              default: available\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                type: array\n' +
        '                items:\n' +
        '                  $ref: \'#/components/schemas/Pet\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                type: array\n' +
        '                items:\n' +
        '                  $ref: \'#/components/schemas/Pet\'\n' +
        '        \'400\':\n' +
        '          description: Invalid status value\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'read:pets\'\n' +
        '  /pet/findByTags:\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Finds Pets by tags\n' +
        '      description: >-\n' +
        '        Multiple tags can be provided with comma separated strings. Use tag1,\n' +
        '        tag2, tag3 for testing.\n' +
        '      operationId: findPetsByTags\n' +
        '      parameters:\n' +
        '        - name: tags\n' +
        '          in: query\n' +
        '          description: Tags to filter by\n' +
        '          required: true\n' +
        '          style: form\n' +
        '          explode: false\n' +
        '          schema:\n' +
        '            type: array\n' +
        '            items:\n' +
        '              type: string\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                type: array\n' +
        '                items:\n' +
        '                  $ref: \'#/components/schemas/Pet\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                type: array\n' +
        '                items:\n' +
        '                  $ref: \'#/components/schemas/Pet\'\n' +
        '        \'400\':\n' +
        '          description: Invalid tag value\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'read:pets\'\n' +
        '      deprecated: true\n' +
        '  \'/pet/{petId}\':\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Find pet by ID\n' +
        '      description: Returns a single pet\n' +
        '      operationId: getPetById\n' +
        '      parameters:\n' +
        '        - name: petId\n' +
        '          in: path\n' +
        '          description: ID of pet to return\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: integer\n' +
        '            format: int64\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Pet\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Pet\'\n' +
        '        \'400\':\n' +
        '          description: Invalid ID supplied\n' +
        '        \'404\':\n' +
        '          description: Pet not found\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Updates a pet in the store with form data\n' +
        '      description: \'\'\n' +
        '      operationId: updatePetWithForm\n' +
        '      parameters:\n' +
        '        - name: petId\n' +
        '          in: path\n' +
        '          description: ID of pet that needs to be updated\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: integer\n' +
        '            format: int64\n' +
        '      responses:\n' +
        '        \'405\':\n' +
        '          description: Invalid input\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'write:pets\'\n' +
        '            - \'read:pets\'\n' +
        '      requestBody:\n' +
        '        content:\n' +
        '          application/x-www-form-urlencoded:\n' +
        '            schema:\n' +
        '              type: object\n' +
        '              properties:\n' +
        '                name:\n' +
        '                  description: Updated name of the pet\n' +
        '                  type: string\n' +
        '                status:\n' +
        '                  description: Updated status of the pet\n' +
        '                  type: string\n' +
        '    delete:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: Deletes a pet\n' +
        '      description: \'\'\n' +
        '      operationId: deletePet\n' +
        '      parameters:\n' +
        '        - name: api_key\n' +
        '          in: header\n' +
        '          required: false\n' +
        '          schema:\n' +
        '            type: string\n' +
        '        - name: petId\n' +
        '          in: path\n' +
        '          description: Pet id to delete\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: integer\n' +
        '            format: int64\n' +
        '      responses:\n' +
        '        \'400\':\n' +
        '          description: Invalid pet value\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'write:pets\'\n' +
        '            - \'read:pets\'\n' +
        '  \'/pet/{petId}/uploadImage\':\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - pet\n' +
        '      summary: uploads an image\n' +
        '      description: \'\'\n' +
        '      operationId: uploadFile\n' +
        '      parameters:\n' +
        '        - name: petId\n' +
        '          in: path\n' +
        '          description: ID of pet to update\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: integer\n' +
        '            format: int64\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/ApiResponse\'\n' +
        '      security:\n' +
        '        - petstore_auth:\n' +
        '            - \'write:pets\'\n' +
        '            - \'read:pets\'\n' +
        '      requestBody:\n' +
        '        content:\n' +
        '          multipart/form-data:\n' +
        '            schema:\n' +
        '              type: object\n' +
        '              properties:\n' +
        '                additionalMetadata:\n' +
        '                  description: Additional data to pass to server\n' +
        '                  type: string\n' +
        '                file:\n' +
        '                  description: file to upload\n' +
        '                  type: string\n' +
        '                  format: binary\n' +
        '  /store/inventory:\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - store\n' +
        '      summary: Returns pet inventories by status\n' +
        '      description: Returns a map of status codes to quantities\n' +
        '      operationId: getInventory\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                type: object\n' +
        '                additionalProperties:\n' +
        '                  type: integer\n' +
        '                  format: int32\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '  /store/order:\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - store\n' +
        '      summary: Place an order for a pet\n' +
        '      description: \'\'\n' +
        '      operationId: placeOrder\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Order\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Order\'\n' +
        '        \'400\':\n' +
        '          description: Invalid Order\n' +
        '      requestBody:\n' +
        '        content:\n' +
        '          application/json:\n' +
        '            schema:\n' +
        '              $ref: \'#/components/schemas/Order\'\n' +
        '        description: order placed for purchasing the pet\n' +
        '        required: true\n' +
        '  \'/store/order/{orderId}\':\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - store\n' +
        '      summary: Find purchase order by ID\n' +
        '      description: >-\n' +
        '        For valid response try integer IDs with value <= 5 or > 10. Other values\n' +
        '        will generate exceptions\n' +
        '      operationId: getOrderById\n' +
        '      parameters:\n' +
        '        - name: orderId\n' +
        '          in: path\n' +
        '          description: ID of pet that needs to be fetched\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: integer\n' +
        '            format: int64\n' +
        '            minimum: 1\n' +
        '            maximum: 5\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Order\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Order\'\n' +
        '        \'400\':\n' +
        '          description: Invalid ID supplied\n' +
        '        \'404\':\n' +
        '          description: Order not found\n' +
        '    delete:\n' +
        '      tags:\n' +
        '        - store\n' +
        '      summary: Delete purchase order by ID\n' +
        '      description: >-\n' +
        '        For valid response try integer IDs with value < 1000. Anything above\n' +
        '        1000 or nonintegers will generate API errors\n' +
        '      operationId: deleteOrder\n' +
        '      parameters:\n' +
        '        - name: orderId\n' +
        '          in: path\n' +
        '          description: ID of the order that needs to be deleted\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: string\n' +
        '      responses:\n' +
        '        \'400\':\n' +
        '          description: Invalid ID supplied\n' +
        '        \'404\':\n' +
        '          description: Order not found\n' +
        '  /user:\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Create user\n' +
        '      description: This can only be done by the logged in user.\n' +
        '      operationId: createUser\n' +
        '      responses:\n' +
        '        default:\n' +
        '          description: successful operation\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '      requestBody:\n' +
        '        content:\n' +
        '          application/json:\n' +
        '            schema:\n' +
        '              $ref: \'#/components/schemas/User\'\n' +
        '        description: Created user object\n' +
        '        required: true\n' +
        '  /user/createWithArray:\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Creates list of users with given input array\n' +
        '      description: \'\'\n' +
        '      operationId: createUsersWithArrayInput\n' +
        '      responses:\n' +
        '        default:\n' +
        '          description: successful operation\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '      requestBody:\n' +
        '        $ref: \'#/components/requestBodies/UserArray\'\n' +
        '  /user/createWithList:\n' +
        '    post:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Creates list of users with given input array\n' +
        '      description: \'\'\n' +
        '      operationId: createUsersWithListInput\n' +
        '      responses:\n' +
        '        default:\n' +
        '          description: successful operation\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '      requestBody:\n' +
        '        $ref: \'#/components/requestBodies/UserArray\'\n' +
        '  /user/login:\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Logs user into the system\n' +
        '      description: \'\'\n' +
        '      operationId: loginUser\n' +
        '      parameters:\n' +
        '        - name: username\n' +
        '          in: query\n' +
        '          description: The user name for login\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: string\n' +
        '            pattern: \'^[a-zA-Z0-9]+[a-zA-Z0-9\\.\\-_]*[a-zA-Z0-9]+$\'\n' +
        '        - name: password\n' +
        '          in: query\n' +
        '          description: The password for login in clear text\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: string\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          headers:\n' +
        '            Set-Cookie:\n' +
        '              description: >-\n' +
        '                Cookie authentication key for use with the `api_key`\n' +
        '                apiKey authentication.\n' +
        '              schema:\n' +
        '                type: string\n' +
        '                example: AUTH_KEY=abcde12345; Path=/; HttpOnly\n' +
        '            X-Rate-Limit:\n' +
        '              description: calls per hour allowed by the user\n' +
        '              schema:\n' +
        '                type: integer\n' +
        '                format: int32\n' +
        '            X-Expires-After:\n' +
        '              description: date in UTC when token expires\n' +
        '              schema:\n' +
        '                type: string\n' +
        '                format: date-time\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                type: string\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                type: string\n' +
        '        \'400\':\n' +
        '          description: Invalid username/password supplied\n' +
        '  /user/logout:\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Logs out current logged in user session\n' +
        '      description: \'\'\n' +
        '      operationId: logoutUser\n' +
        '      responses:\n' +
        '        default:\n' +
        '          description: successful operation\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '  \'/user/{username}\':\n' +
        '    get:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Get user by user name\n' +
        '      description: \'\'\n' +
        '      operationId: getUserByName\n' +
        '      parameters:\n' +
        '        - name: username\n' +
        '          in: path\n' +
        '          description: The name that needs to be fetched. Use user1 for testing.\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: string\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: successful operation\n' +
        '          content:\n' +
        '            application/xml:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/User\'\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/User\'\n' +
        '        \'400\':\n' +
        '          description: Invalid username supplied\n' +
        '        \'404\':\n' +
        '          description: User not found\n' +
        '    put:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Updated user\n' +
        '      description: This can only be done by the logged in user.\n' +
        '      operationId: updateUser\n' +
        '      parameters:\n' +
        '        - name: username\n' +
        '          in: path\n' +
        '          description: name that need to be deleted\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: string\n' +
        '      responses:\n' +
        '        \'400\':\n' +
        '          description: Invalid user supplied\n' +
        '        \'404\':\n' +
        '          description: User not found\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        '      requestBody:\n' +
        '        content:\n' +
        '          application/json:\n' +
        '            schema:\n' +
        '              $ref: \'#/components/schemas/User\'\n' +
        '        description: Updated user object\n' +
        '        required: true\n' +
        '    delete:\n' +
        '      tags:\n' +
        '        - user\n' +
        '      summary: Delete user\n' +
        '      description: This can only be done by the logged in user.\n' +
        '      operationId: deleteUser\n' +
        '      parameters:\n' +
        '        - name: username\n' +
        '          in: path\n' +
        '          description: The name that needs to be deleted\n' +
        '          required: true\n' +
        '          schema:\n' +
        '            type: string\n' +
        '      responses:\n' +
        '        \'400\':\n' +
        '          description: Invalid username supplied\n' +
        '        \'404\':\n' +
        '          description: User not found\n' +
        '      security:\n' +
        '        - api_key: []\n' +
        'externalDocs:\n' +
        '  description: Find out more about Swagger\n' +
        '  url: \'http://swagger.io\'\n' +
        'components:\n' +
        '  requestBodies:\n' +
        '    UserArray:\n' +
        '      content:\n' +
        '        application/json:\n' +
        '          schema:\n' +
        '            type: array\n' +
        '            items:\n' +
        '              $ref: \'#/components/schemas/User\'\n' +
        '      description: List of user object\n' +
        '      required: true\n' +
        '    Pet:\n' +
        '      content:\n' +
        '        application/json:\n' +
        '          schema:\n' +
        '            $ref: \'#/components/schemas/Pet\'\n' +
        '        application/xml:\n' +
        '          schema:\n' +
        '            $ref: \'#/components/schemas/Pet\'\n' +
        '      description: Pet object that needs to be added to the store\n' +
        '      required: true\n' +
        '  securitySchemes:\n' +
        '    petstore_auth:\n' +
        '      type: oauth2\n' +
        '      flows:\n' +
        '        implicit:\n' +
        '          authorizationUrl: \'http://petstore.swagger.io/api/oauth/dialog\'\n' +
        '          scopes:\n' +
        '            \'write:pets\': modify pets in your account\n' +
        '            \'read:pets\': read your pets\n' +
        '    api_key:\n' +
        '      type: apiKey\n' +
        '      name: api_key\n' +
        '      in: header\n' +
        '  schemas:\n' +
        '    Order:\n' +
        '      title: Pet Order\n' +
        '      description: An order for a pets from the pet store\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '        petId:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '        quantity:\n' +
        '          type: integer\n' +
        '          format: int32\n' +
        '        shipDate:\n' +
        '          type: string\n' +
        '          format: date-time\n' +
        '        status:\n' +
        '          type: string\n' +
        '          description: Order Status\n' +
        '          enum:\n' +
        '            - placed\n' +
        '            - approved\n' +
        '            - delivered\n' +
        '        complete:\n' +
        '          type: boolean\n' +
        '          default: false\n' +
        '      xml:\n' +
        '        name: Order\n' +
        '    Category:\n' +
        '      title: Pet category\n' +
        '      description: A category for a pet\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '        name:\n' +
        '          type: string\n' +
        '          pattern: \'^[a-zA-Z0-9]+[a-zA-Z0-9\\.\\-_]*[a-zA-Z0-9]+$\'\n' +
        '      xml:\n' +
        '        name: Category\n' +
        '    User:\n' +
        '      title: a User\n' +
        '      description: A User who is purchasing from the pet store\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '        username:\n' +
        '          type: string\n' +
        '        firstName:\n' +
        '          type: string\n' +
        '        lastName:\n' +
        '          type: string\n' +
        '        email:\n' +
        '          type: string\n' +
        '        password:\n' +
        '          type: string\n' +
        '        phone:\n' +
        '          type: string\n' +
        '        userStatus:\n' +
        '          type: integer\n' +
        '          format: int32\n' +
        '          description: User Status\n' +
        '      xml:\n' +
        '        name: User\n' +
        '    Tag:\n' +
        '      title: Pet Tag\n' +
        '      description: A tag for a pet\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '        name:\n' +
        '          type: string\n' +
        '      xml:\n' +
        '        name: Tag\n' +
        '    Pet:\n' +
        '      title: a Pet\n' +
        '      description: A pet for sale in the pet store\n' +
        '      type: object\n' +
        '      required:\n' +
        '        - name\n' +
        '        - photoUrls\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '        category:\n' +
        '          $ref: \'#/components/schemas/Category\'\n' +
        '        name:\n' +
        '          type: string\n' +
        '          example: doggie\n' +
        '        photoUrls:\n' +
        '          type: array\n' +
        '          xml:\n' +
        '            name: photoUrl\n' +
        '            wrapped: true\n' +
        '          items:\n' +
        '            type: string\n' +
        '        tags:\n' +
        '          type: array\n' +
        '          xml:\n' +
        '            name: tag\n' +
        '            wrapped: true\n' +
        '          items:\n' +
        '            $ref: \'#/components/schemas/Tag\'\n' +
        '        status:\n' +
        '          type: string\n' +
        '          description: pet status in the store\n' +
        '          deprecated: true\n' +
        '          enum:\n' +
        '            - available\n' +
        '            - pending\n' +
        '            - sold\n' +
        '      xml:\n' +
        '        name: Pet\n' +
        '    ApiResponse:\n' +
        '      title: An uploaded response\n' +
        '      description: Describes the result of uploading an image resource\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        code:\n' +
        '          type: integer\n' +
        '          format: int32\n' +
        '        type:\n' +
        '          type: string\n' +
        '        message:\n' +
        '          type: string');

    const handleYAMLChange = (newValue) => {
        setYAMLValue(newValue);
    };

    const handleSaveYAMLChange = async () => {
        const defaultPath = "open-apis-specs.yml";
        window.postMessage({type: "createFile", filePath: defaultPath, fileContent: yamlValue}, '*');
        await Utilities.showSaveFilePickerFor(defaultPath, yamlValue)
    };

    return(
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '48%', height: "50%", maxHeight: "50%"}}>
                <Button className="aling-right mb-2" onClick={handleSaveYAMLChange}>Save</Button> {savedTo && "Saved to: " + savedTo}
                <CodeEditor
                    value={yamlValue}
                    language="yaml"
                    placeholder="Please enter OpenAPI Specification here."
                    onChange={(evn) => setYAMLValue(evn.target.value)}
                    padding={15}
                    style={{
                        height: "50%", maxHeight: "50%",
                        fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
                    }}
                />
            </div>
            <div style={{width: '48%'}}>
                <SwaggerUI spec={yamlValue}/>
            </div>
        </div>
    )
}
export default OpenApisSpecificationEditorAndSwaggerPreview;