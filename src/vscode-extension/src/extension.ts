import * as vscode from 'vscode';
import { Uri, WebviewPanel, WebviewOptions } from 'vscode';
import * as fs from "fs";
import * as archiver from 'archiver';

const workspaceFolders = vscode.workspace.workspaceFolders;

export function activate(context: vscode.ExtensionContext) {
    const openWebUrlCommand = vscode.commands.registerCommand('odeev-kata-poc-app-extension.open', () => {
        const webviewPanel = createWebviewPanel(context.extensionUri);
        webviewPanel.reveal(vscode.ViewColumn.Beside);
    });

    context.subscriptions.push(openWebUrlCommand);
}

function createWebviewPanel(extensionUri: Uri): WebviewPanel {
    const panel = vscode.window.createWebviewPanel(
        'myWebview',
        'Odeev Kata PoC App',
        vscode.ViewColumn.Beside,
        {
            enableScripts: true
        }
    );

    let scriptSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "dist", "static", "js", "main.js"))
    let cssSrc = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionUri, "dist", "static", "css", "main.css"))
    let workspacePath = "";
    if (workspaceFolders) {
        workspacePath = workspaceFolders[0].uri.fsPath;
    }
    panel.webview.onDidReceiveMessage(message => {
        console.log('VSCODE Received data:', message);

        if (message && message.type === 'createFile' && message.fileContent) {
            const fileContent = message.fileContent;
            const filePath = message.filePath;
            fs.writeFileSync(workspacePath + filePath, fileContent);
            console.log('File saved successfully!');
        } else if (message && message.type === 'createProject' && message.fileContent) {
            const fileContent = message.fileContent;
            const filePath = message.filePath;
            fs.writeFileSync(workspacePath + filePath, fileContent);
            const fileExtension = (workspacePath + filePath).split('.').pop();
            console.log('File saved successfully!');
            if (fileExtension === 'zip') {
                const outputPath = (workspacePath + filePath).replace('.zip', '');
                const archive = archiver('zip', { zlib: { level: 9 } });
                archive.pipe(fs.createWriteStream(outputPath));
                archive.file((workspacePath + filePath), { name: (workspacePath + filePath) });
                archive.finalize();

                console.error(`Unzipped file to ${outputPath}`);
            } else {
                console.error('Please select a ZIP file.');
            }
        } else {
            console.error('No workspace opened in VS Code.');
        }
    });
    panel.webview.html = `<!DOCTYPE html>
        <html data-darkreader-mode="dynamic" data-darkreader-scheme="dark" lang="en">
          <head>
            <script defer src="${scriptSrc}"></script>
            <link rel="stylesheet" href="${cssSrc}" />
          </head>
          <body>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <div id="root"></div>
          </body>
          <script>
            window.postMessage("Init message", "*");    
            const vscode = acquireVsCodeApi();
            window.addEventListener('message', event => {
              const message = event.data;
                vscode.postMessage(message);
            });
           </script>
        </html>
        `;

    return panel;
}

export function deactivate() {}