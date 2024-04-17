import CodeEditor from "@uiw/react-textarea-code-editor";
import React, {useEffect, useState} from "react";

const ReadOnlyFileEditor = ({files, fileName}) => {
    const [lang, setLang] = useState()
    const [content, setContent] = useState()
    useEffect(() => {
        const file = files.find(file=> file.name === fileName);
        if(file) {
            setContent(file.content)
            setLang(fileName.split(".").pop())
        }

    }, [fileName])

    return(
        <CodeEditor
            value={content}
            language={lang}
            placeholder="Please select a file to view here."
            padding={15}
            readOnly={true}
            style={{
                height: "100%",
                fontFamily: 'ui-monospace,SFMono-Regular,SF Mono,Consolas,Liberation Mono,Menlo,monospace'
            }}
        />
    )
}

export default ReadOnlyFileEditor;
