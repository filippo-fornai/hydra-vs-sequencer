import * as acorn from 'acorn';
import Hydra from 'hydra-synth'
// import estraverse from 'estraverse';

const input = document.getElementById('codeInput');
const button = document.getElementById('parseButton');
const output = document.getElementById('output');

button.addEventListener('click', () => {
    var code = input.value;
    // Remove .out() from the end and any trailing \n
    code = code.split('.').slice(0, -1).join('.');
    console.log(code);

    let ast;
    try {
        ast = acorn.parse(code, {
            ecmaVersion: 'latest',
            sourceType: 'module',
        });
        console.log(JSON.stringify(ast, null, 2));
    } catch (err) {
        output.textContent = `Parse error: ${err.message}`;
        return;
    }

    const foundCalls = [];

    visit(code, ast, foundCalls);

    foundCalls.reverse(); // Reverse the order of function calls

    output.innerHTML = ''; // Clear previous output
    if (foundCalls.length) {
        foundCalls.forEach((call, index) => {
            const div = document.createElement('div');
            div.id = `hydra-output-${index}`;
            div.style.width = '20vw'; // 20% of the viewport width
            div.style.height = 'auto'; // Adjust height automatically based on content
            div.style.border = '1px solid black';
            div.style.margin = '10px';
            div.style.display = 'flex';
            div.style.flexDirection = 'column';
            div.style.alignItems = 'center';
            div.style.justifyContent = 'flex-start'; // Align content to the top
            div.style.boxSizing = 'border-box'; // Ensure padding and border are included in width/height
            div.style.padding = '10px'; // Add padding for better spacing

            // Ensure at most 3 divs per row
            output.style.display = 'flex';
            output.style.flexWrap = 'wrap';
            output.style.justifyContent = 'space-around';

            output.appendChild(div);
            const codeLabel = document.createElement('p');
            codeLabel.textContent = `Code: ${call}.out()`;
            codeLabel.style.fontFamily = 'monospace';
            codeLabel.style.margin = '5px 0';
            codeLabel.style.textAlign = 'center'; // Center-align the text
            codeLabel.style.wordWrap = 'break-word'; // Ensure text wraps within the div
            codeLabel.style.overflowWrap = 'break-word'; // Add compatibility for older browsers
            codeLabel.style.whiteSpace = 'normal'; // Allow text to wrap to the next line
            codeLabel.style.maxWidth = '100%'; // Ensure the text stays within the div
            div.appendChild(codeLabel);

            try {
                const canvas = document.createElement('canvas');
                canvas.width = div.clientWidth - 20; // Adjust canvas width to fit within the div
                canvas.height = (canvas.width * 3) / 4; // Maintain a 4:3 aspect ratio
                canvas.style.display = 'block'; // Ensure canvas stays within the div
                canvas.style.marginTop = '10px'; // Add spacing between the label and canvas
                div.appendChild(canvas);

                const hydra = new Hydra({
                    // makeGlobal: false,
                    canvas: canvas,
                    detectAudio: false,
                });

                const hydraCode = `${call}.out()`;
                
                // Gets called on last hydra instance that was used
                eval(hydraCode); // Execute the code in Hydra

            } catch (err) {
                console.error(`Error executing Hydra code: ${err.message}`);
            }
        });
    } else {
        output.textContent = 'No function calls found.';
    }
});

function visit(code,node,output) {
    switch(node.type) {
        case 'Program':
            for (let i = 0; i < node.body.length; i++) {
                visit(code,node.body[i],output);
            }
            break;
        case 'ExpressionStatement': 
            visit(code,node.expression,output);
            break;
        case 'CallExpression':
            output.push(code.slice(node.start,node.end));
            visit(code,node.callee,output);
            break;
        case 'MemberExpression':
            visit(code,node.object,output);
            break;
    }
}