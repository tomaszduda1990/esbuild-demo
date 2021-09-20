import React, {useRef} from 'react'
import MonacoEditor, { OnChange, OnMount } from "@monaco-editor/react";
import prettier from 'prettier';
import parser from 'prettier/parser-babel'
interface Props {
    initialValue: string;
    onCodeChange(code: string): void;
}

const CodeEditor: React.FC<Props> = ({initialValue, onCodeChange}) => {
    const editorRef = useRef<any>(); 
    const handleEditorChange: OnChange = (value) => {
       
        if(value) {
            onCodeChange(value);
        }
    
    }

    const  handleEditorDidMount: OnMount = (editor, monaco) => {
        // here is the editor instance
        // you can store it in `useRef` for further usage
        editorRef.current = editor;
        
    }
    
    const prettifyCode = (e: React.FormEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const unformatted = editorRef.current.getValue();
        const formatted = prettier.format(unformatted, {
            parser: "babel",
            plugins: [parser],
            useTabs: true,
            semi: true,
            singleQuote: true
        })
        editorRef.current.setValue(formatted);
    }
    return (
      <> 
        <button onClick={prettifyCode}>Prettify code</button>
          <MonacoEditor 
          onChange={handleEditorChange} 
          onMount={handleEditorDidMount}
          value={initialValue} 
          theme="vs-dark" 
          height='500px' 
          language="javascript" 
          options={{
            wordWrap: 'on',
            minimap: { enabled: false },
            showUnused: false,
            folding: false,
            lineNumbersMinChars: 3,
            fontSize: 16,
            scrollBeyondLastLine: false,
            automaticLayout: true,
        }}>
            
        </MonacoEditor>
      </>
    )
}

export default CodeEditor
