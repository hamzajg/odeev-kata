import * as vscode from 'vscode';
import { Uri, WebviewPanel, WebviewOptions } from 'vscode';

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
            enableScripts: true,
            localResourceRoots: [Uri.joinPath(extensionUri, 'webview')]
        }
    );

    panel.webview.html = getWebviewContent(extensionUri);

    return panel;
}

function getWebviewContent(extensionUri: Uri): string {

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Odeev Kata PoC App</title>
      <style> html, body {width: 100%; height: 100%}</style>
    </head>
    <body>
      <iframe src="http://localhost:3000" style="height:100%; width:100%"  width="100%" height="100%"></iframe>
    </body>
    </html>
  `;
}

export function deactivate() {}
