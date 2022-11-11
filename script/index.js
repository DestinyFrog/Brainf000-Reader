const stdout = document.getElementById('output');
const main = {
    ['>']: "pointer++;",
    ['<']: "pointer--;",
    ['+']: "memory[pointer]++; Check();",
    ['-']: "memory[pointer]--; Check();",
    ['[']: "while(memory[pointer]!=0 && rep<260){rep++;",
    [']']: "}; rep=0;",
    [',']: "memory[pointer]=parseInt(prompt(',')); Check();",
    ['.']: "answer = answer+(String.fromCharCode(memory[pointer]));"
}

function Compile(text) {
    var memory = {}; for(i=0;i<16;i++){memory[i]=0};
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
        if(main[obj] != undefined){
            code = code+main[obj]+'\n';
        }
    });

    try {
        eval(code);
        stdout.value = answer;
    } catch (e) {
        stdout.value = "Can't run there is an error in code";
    }
}