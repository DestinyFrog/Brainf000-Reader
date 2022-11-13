const inp = document.getElementById('input');
const main = []
    main['>'] = "pointer++;";
    main['<'] = "pointer--;";
    main['+'] = "memory[pointer]++; Check();";
    main['-'] = "memory[pointer]--; Check();";
    main['['] = "while(memory[pointer]!=0 && rep<260){rep++;";
    main[']'] = "}; rep=0;";
    main[','] = "memory[pointer]=prompt(',').charCodeAt(0); Check();";
    main['.'] = "answer += (String.fromCharCode(memory[pointer]));";
const size = 1024;
var can = true;

function Compile(text) {
    if( can == false ){ return; }
    var memory = Array(size).fill(0); 
    var pointer = 8;
    var answer = '';
    var rep = 0;
    let code = '';
    function Check(){
        return;
        if(memory[pointer] > 255){ memory[pointer] = 0; }
        if(memory[pointer] < 0){ memory[pointer] = 255; }
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
}; Compile(document.getElementById('input').value);

function UnCompile(text) {
    if( can == false ){ return; }
    let code = text.split('');
    inp.value = '';

    let last = 0;
    code.forEach(obj => {
        let val = obj.charCodeAt();
        let count = last-val;
        if(count < 0){count = count * -1;}

        function look(main){
            for(let div=main; div>1; div--){
                let v = count/div;
                if(Number.isInteger(v) && v > 2) {
                    inp.value += '>'+('+'.repeat(div))+'[<'+(val>last?'+':'-').repeat(v)+'>-]<';
                    return true;
                }
            }
            inp.value += ((val>last?'+':'-').repeat(count));
        }
        // inp.value += ((main[obj]==undefined?obj:'#')+'_'+addZeroes(val,3)+' ');
        look(8);
        inp.value += '.';
        last = val;
    });
}

function addZeroes(num, len) {
    var numberWithZeroes = String(num);
  var counter = numberWithZeroes.length;
      
  while(counter < len) {
  
      numberWithZeroes = "0" + numberWithZeroes;
    
    counter++;
  
    }
  
  return numberWithZeroes;
}