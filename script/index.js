const main = {
    ['>']: "pointer++;",
    ['<']: "pointer--;",
    ['+']: "memory[pointer]++; Check();",
    ['-']: "memory[pointer]--; Check();",
    ['[']: "while(memory[pointer]!=0 && rep<260){rep++;",
    [']']: "}; rep=0;",
    [',']: "memory[pointer]=parseInt(prompt(',')); Check();",
    ['.']: "answer += (String.fromCharCode(memory[pointer]));"
}
const size = 1024;

function Compile(text) {
    var memory = Array(size).fill(0); 
    var pointer = 8;
    var answer = '';
    var rep = 0;
    let code = '';
    function Check(){
        if(memory[pointer] > 255){
            memory[pointer] = 0;
        }

        if(memory[pointer] < 0){
            memory[pointer] = 255;
        }
    }

    text.replace(/([^\[\].,+-><])/g,'').split('').forEach((obj) => {
        code += main[obj]+'\n';
    });

    try {
        eval(code);
    } catch (e) {
        answer = "Can't run there is an error in code";
    }

    document.getElementById('output').value = answer;
}