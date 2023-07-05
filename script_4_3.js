let major = [];      // 입력된 전체 전공 학점
let non_major = [];      // 입력된 전체 학점 (전공X)
let major_or_not = [];      // 입력된 과목이 전공인지 아닌지 기록(전공일 경우 0, 아닐 경우 1)
let select = -1;        // 마지막으로 선택한 학점 (grades 배열의 인덱스 저장)
let letters = ["A+", "A0", "A-", "B+", "B0", "B-", "C+", "C0", "C-", "D+", "D0", "D-", "F"];
let grades = [4.3, 4.0, 3.7, 3.3, 3.0, 2.7, 2.3, 2.0, 1.7, 1.3, 1.0, 0.7, 0.0];
let output_major = "Major\n\n";
let output_non_major = "Non-major\n\n";

// output scree에 띄우기
output_update();

// grade 버튼 클릭 시 동작
let letter_button = document.querySelectorAll('.letter');
letter_button.forEach((button) => {
    button.addEventListener('click', choose)
});
// Major or Non-major 버튼 클릭 시 동작
let grade_submit = document.querySelectorAll('.major');
grade_submit.forEach((button) => {
    button.addEventListener('click', grade_plus)
});
// Reset 버튼 클릭시 동작
document.querySelector('.one.remove').addEventListener('click', reset);
// Delete 버튼 클릭시 동작
document.querySelector('.two.remove').addEventListener('click', ddelete);
// I'm Done 버튼 클릭시 동작
document.querySelector('.three').addEventListener('click', print_result);
// Home 버튼 클릭시 동작
document.getElementById('home').addEventListener('click', home);
// 4.5 version 버튼 클릭시 동작
document.getElementById('4.5').addEventListener('click', moving);

function choose(e) {
    select = parseInt(e.target.id);
    document.querySelector('input').value = letters[select];
}
function grade_plus(e) {
    if(select != -1) {
        if(e.target.id.includes("non")) {       // 전공 과목이 아닌 경우
            non_major.push(letters[select]);
            major_or_not.push(1);
        } else {        // 전공 과목일 경우
            major.push(letters[select]);
            major_or_not.push(0);
        }
        select = -1;
        document.querySelector('input').value = "";
        output_update();
    }
}
function reset() {
    major = [];
    non_major = [];
    major_or_not = [];
    select = -1;
    document.querySelector('input').value = "";
    output_update();
}
function ddelete() {
    if(select != -1) {      // submit 전 상황일 경우 선택만 취소
        select = -1;
        document.querySelector('input').value = "";
    }
    else if(select==-1 && major_or_not.length > 0 ) {      // submit까지 완료한 상황일 경우
        if(major_or_not.pop()==0) 
            major.pop();
        else
            non_major.pop();
        output_update();
    }
}
function output_update() {
    let output_major = "Major\n\n";
    let output_non_major = "Non-major\n\n";
    for(let i = 0; i < major.length; i++)
        output_major += major[i]+"\n";
    for(let i = 0; i < non_major.length; i++)
       output_non_major += non_major[i]+"\n";
    document.querySelector("#screen_major").value = output_major;
    document.querySelector("#screen_non_major").value = output_non_major;
}
function print_result() {
    let sum_major = 0;
    for(let i = 0; i < major.length; i++)
        sum_major += grades[letters.indexOf(major[i])];
    let sum_total = sum_major;
    for(let i = 0; i < non_major.length; i++)
        sum_total += grades[letters.indexOf(non_major[i])];
    sum_major /= major.length;
    sum_total /= (major.length + non_major.length);
    document.querySelector("#screen_major").value = "Total GPA\n\n" + Math.round(sum_total*100)/100 + " / 4.3\n\n";
    document.querySelector("#screen_major").value += Math.round(sum_total/4.3*4.5*100)/100 + " / 4.5";
    document.querySelector("#screen_non_major").value = "Major GPA\n\n" + Math.round(sum_major*100)/100 + " / 4.3\n\n";
    document.querySelector("#screen_non_major").value += Math.round(sum_major/4.3*4.5*100)/100 + " / 4.5";
}
function moving() {
    location.replace("4_5.html");
}
function home() {
    location.replace("index.html");
}

