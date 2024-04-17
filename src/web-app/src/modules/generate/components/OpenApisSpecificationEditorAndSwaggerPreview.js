import CodeEditor from "@uiw/react-textarea-code-editor";
import SwaggerUI from "swagger-ui-react";
import 'swagger-ui-react/swagger-ui.css';
import React, {useState} from "react";

const OpenApisSpecificationEditorAndSwaggerPreview = () => {

    const [yamlValue, setYAMLValue] = useState('openapi: 3.0.0\n' +
        'info:\n' +
        '  title: Todo API\n' +
        '  description: Odeev Kata PoC Todo APIs\n' +
        '  version: 1.0.0\n' +
        'servers:\n' +
        '  - url: https://api.example.com/v1\n' +
        'paths:\n' +
        '  /todos:\n' +
        '    get:\n' +
        '      summary: Retrieve all Todo items\n' +
        '      operationId: getTodos\n' +
        '      responses:\n' +
        '        \'200\':\n' +
        '          description: A list of Todo items\n' +
        '          content:\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                type: array\n' +
        '                items:\n' +
        '                  $ref: \'#/components/schemas/Todo\'\n' +
        '    post:\n' +
        '      summary: Create a new Todo item\n' +
        '      operationId: createTodo\n' +
        '      requestBody:\n' +
        '        required: true\n' +
        '        content:\n' +
        '          application/json:\n' +
        '            schema:\n' +
        '              $ref: \'#/components/schemas/NewTodo\'\n' +
        '      responses:\n' +
        '        \'201\':\n' +
        '          description: The created Todo item\n' +
        '          content:\n' +
        '            application/json:\n' +
        '              schema:\n' +
        '                $ref: \'#/components/schemas/Todo\'\n' +
        'components:\n' +
        '  schemas:\n' +
        '    Todo:\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        id:\n' +
        '          type: integer\n' +
        '          format: int64\n' +
        '          description: The unique identifier for the Todo item\n' +
        '        title:\n' +
        '          type: string\n' +
        '          description: The title of the Todo item\n' +
        '        description:\n' +
        '          type: string\n' +
        '          description: The description of the Todo item\n' +
        '        completed:\n' +
        '          type: boolean\n' +
        '          description: Indicates if the Todo item is completed\n' +
        '      required:\n' +
        '        - title\n' +
        '    NewTodo:\n' +
        '      type: object\n' +
        '      properties:\n' +
        '        title:\n' +
        '          type: string\n' +
        '          description: The title of the new Todo item\n' +
        '        description:\n' +
        '          type: string\n' +
        '          description: The description of the new Todo item\n' +
        '      required:\n' +
        '        - title\n');

    const handleYAMLChange = (newValue) => {
        setYAMLValue(newValue);
    };
    return(
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
            <div style={{width: '48%'}}>
                <CodeEditor
                    value={yamlValue}
                    language="yaml"
                    placeholder="Please enter OpenAPI Specification here."
                    onChange={(evn) => setYAMLValue(evn.target.value)}
                    padding={15}
                    style={{
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