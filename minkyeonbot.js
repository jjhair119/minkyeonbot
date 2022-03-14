importClass(org.jsoup.Jsoup);
const scriptName = "민견봇";
/*
 * (string) room
 * (string) sender
 * (boolean) isGroupChat
 * (void) replier.reply(message)
 * (boolean) replier.reply(room, message, hideErrorToast = false) // 전송 성공시 true, 실패시 false 반환
 * (string) imageDB.getProfileBase64()
 * (string) packageName
 */

/*
    개발자
    - 지지지지민경

    기여한 사람
    - 민경록
    - 심민성
    - 이준상
    - 조유찬
    - 최지원 ++1
*/

let timetable = new Array(7);
let belltable = new Array(17);

let areacode = "B10";
let schoolcode = "7010536";
let api_key = "224cb6feef5d495bb61afeb0be362568";

let url = "https://open.neis.go.kr/hub/mealServiceDietInfo?";

function response(room, msg, sender, isGroupChat, replier, imageDB, packageName) {
  if(1){
    if(msg.startsWith(".t")){
        if(msg == ".t"){
            let date = toDay();
            if(date == 0 || date == 6){
                replier.reply(timetable[0]);
            }
            else{
                let replytext = "";
                for(var i = 0;i<7;i++){
                    replytext += (i+1).toString() + "교시 : " + timetable[i];
                    replytext += i==6 ? "" : "\n";
                }
                replier.reply(replytext);
            }
        }
        else if(msg == ".t 월" ||msg == ".t 화" ||msg == ".t 수" ||msg == ".t 목" ||msg == ".t 금"){
            switch(msg) {
                case ".t 월" : mon(); break;
                case ".t 화" : tue(); break;
                case ".t 수" : wed(); break;
                case ".t 목" : thu(); break;
                case ".t 금" : fri(); break;
            }
            let replytext = "";
            for(var i = 0;i<7;i++){
                replytext += (i+1).toString() + "교시 : " + timetable[i];
                replytext += i==6 ? "" : "\n";
            }
            replier.reply(replytext);
        }
        else if(msg == ".t 토"||msg == ".t 일"){
            replier.reply("그 주말인거 알면서 꼭 이걸 해봐 어?");
        }
        else if(msg == ".t 선생님"){
            replier.reply("김수인선생님 - 1호관 1층 교육연구부\n박지혜선생님 - 2호관 1층 특성화부\n박정아선생님 - 2호관 1층 취업부\n전형주선생님 - 2호관 1층 3학년부\n정영주선생님 - 3호관 3층 교육정보부\n이왕렬선생님 - 3호관 4층 소프트웨어과");
        }
        else if(msg == ".t 전공실"){
            replier.reply("공업일반 - 422실(교실)\n게임프로그래밍 - 343실\n데이터베이스프로그래밍 - 422실(교실)\n인공지능과미래사회 - 421실\n진로 - 422실\n스마트문화앱콘텐츠제작 - 421실\n응용프로그래밍개발A - 423실\n응용프로그래밍개발B - 422실");
        }
        else if(msg == ".t 30"){
            replier.reply("30분+5분 시간표\n조회 08:30 ~ 08:40\n1교시 08:40 ~ 09:10\n2교시 09:15 ~ 09:45\n3교시 09:50 ~ 10:20\n4교시 10:25 ~ 10:55\n5교시 11:00 ~ 11:30\n6교시 11:35 ~ 12:05\n7교시 12:10 ~ 12:40\n종례 12:40 ~");
        }
        else if(msg == ".t 45"){
            replier.reply("45분+5분 시간표\n조회 08:30 ~ 08:40\n1교시 08:40 ~ 09:25\n2교시 09:30 ~ 10:15\n3교시 10:20 ~ 11:05\n4교시 11:10 ~ 11:55\n점심 12:00 ~ 12:45\n5교시 12:50 ~ 13:35\n6교시 13:40 ~ 14:25\n7교시 14:30 ~ 15:15\n종례 15:15 ~");
        }
        else if(msg == ".t 50"){
            replier.reply("50분+5분 시간표\n조회 08:30 ~ 08:40\n1교시 08:40 ~ 09:30\n2교시 09:35 ~ 10:25\n3교시 10:30 ~ 11:20\n4교시 11:25 ~ 12:15\n점심 12:15 ~ 13:05\n5교시 13:10 ~ 14:00\n6교시 14:05 ~ 14:55\n7교시 15:00 ~ 15:50\n종례 15:50 ~");
        }
        else if(msg == ".t 급식"){
            let lunchdate = getDateString();
            let lunchResult=getLunch(lunchdate);
            replier.reply(lunchdate);
            replier.reply(lunchResult);
        }
        else if(msg.startsWith(".t 급식")){
            let lunchuserinput = msg.split(" ");
            if(getDigit(lunchuserinput[2])==8){
                let lunchResult=getLunch(lunchuserinput[2]);
                replier.reply(lunchuserinput[2]);
                replier.reply(lunchResult);
            }
        }
        else if(msg.startsWith(".t test")){
            let user = msg.split(" ");
            if(isNaN(user[2]) || isNaN(user[3])){
            }else{
                if(((user[2] >= 20 && user[2] <= 60) && (user[3] >= 5 && user[3] <= 10)) && (user[2]%1==0 && user[3]%1==0)){
                    timeset(user[2], user[3]);
                    let resaulttable = ""
                    for(let i=0;i<15;i++){
                        resaulttable += belltable[i];
                        if(i%2==0 && i!=14 && i!=15)
                            resaulttable += "\n"+(parseInt(i/2)+2)+"교시 : ";
                        else if(i==14)
                            resaulttable += "\n";
                        else if(i%2==1  && i!=14 && i!=15){
                            resaulttable +=" ~ "
                        }
                    }
                    replier.reply("조회 08:30 ~ 08:40\n1교시 8:40 ~ "+resaulttable+"종례 : "+belltable[14]+" ~");
                }
            }
        }
    }
  }
}

function toDay() {
    let day = new Date();
    let date = day.getDay();

    switch(date) {
        case 0 :timetable[0] = "오늘 수업은 없습니다.";    //일
                break;

        case 1 :mon();    //월
                break;

        case 2 :tue()    //화
                break;

        case 3 :wed()    //수
                break;

        case 4 :thu()    //목
                break;

        case 5 :fri()    //금
                break;

        case 6 :timetable[0] = "오늘 수업은 없습니다.";    //토
                break;
    }

    return date;
}

function getDateString() {
    let day = new Date();
    let date = (day.getFullYear()).toString();
    if(day.getMonth()<9){
        date += "0"+((day.getMonth())+1).toString();
    }else{
        date += ((day.getMonth())+1).toString();
    }
    date += (day.getDate()).toString();

    return date;
}

function mon(){
    timetable[0] = "게임 - 정영주선생님";
    timetable[1] = "게임 - 정영주선생님";
    timetable[2] = "공일 - 이은경선생님";
    timetable[3] = "영어2 - 전형주선생님";
    timetable[4] = "공수(미적) - 조유진선생님";
    timetable[5] = "인지 - 김수인선생님";
    timetable[6] = "인지 - 김수인선생님";
}

function tue(){
    timetable[0] = "DB - 박지혜선생님";
    timetable[1] = "DB - 박지혜선생님";
    timetable[2] = "화작C - 유명은선생님";
    timetable[3] = "미적 - 조유진선생님";
    timetable[4] = "성 - 신송이선생님";
    timetable[5] = "진로 - 이은경선생님";
    timetable[6] = "체육 - 양승찬선생님";
}

function wed(){
    timetable[0] = "성직 - 박정아선생님";
    timetable[1] = "게임 - 심희원선생님";
    timetable[2] = "공일 - 이은경선생님";
    timetable[3] = "영어2 - 전형주선생님";
    timetable[4] = "응프 - 이왕렬선생님";
    timetable[5] = "응프 - 이왕렬선생님";
    timetable[6] = "동아리";
}

function thu(){
    timetable[0] = "게임 - 정영주선생님";
    timetable[1] = "인지 - 김수인선생님";
    timetable[2] = "인지 - 김수인선생님";
    timetable[3] = "성직 - 박정아선생님";
    timetable[4] = "화작A - 이승만선생님";
    timetable[5] = "미적 - 조유진선생님";
    timetable[6] = "화작B - 이계현선생님";
}

function fri(){
    timetable[0] = "미적 - 조유진선생님";
    timetable[1] = "성직 - 박정아선생님";
    timetable[2] = "DB - 박지혜선생님";
    timetable[3] = "공일 - 이은경선생님";
    timetable[4] = "영어2 - 전형주선생님";
    timetable[5] = "자율";
    timetable[6] = "X";
}

function getLunch(date){
    let lunchparams = {
        "ATPT_OFCDC_SC_CODE" : areacode,
        "SD_SCHUL_CODE" : schoolcode,
        "KEY" : api_key,
        "Type" : "xml",
        "MLSV_YMD" : date
    };
    
    let query = Object.keys(lunchparams) 
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(lunchparams[k])) 
        .join('&');

    url += query;

    let result = Jsoup.connect(url)
        .data("ATPT_OFCDC_SC_CODE", areacode)
        .data("SD_SCHUL_CODE", schoolcode)
        .data("KEY", api_key)
        .data("Type", 'xml')
        .data("MLSV_YMD", date)
        .get();

    let resultText = result.select('DDISH_NM').text();

    resultText = replaceAll(resultText, "<br/>", "\n")

    return resultText;
}

function replaceAll(str, searchStr, replaceStr) {
    return str.split(searchStr).join(replaceStr);
}

 function getDigit(num) {
    num = num.toString();
    var i=0;
    while(num[i]) { i++; };
    return i;
}

function timeset(l, r){
    let lt = parseInt(l);
    let rt = parseInt(r);

    let starttime = 520;

    for(let i=0;i<15;i++){
        let flaghour;
        let flagmin;
        if(i%2==0){
            starttime = starttime+ lt;
            flaghour = Math.floor(starttime/60);
            flagmin = starttime-60*flaghour;
            if(flagmin>=60){
                flagmin=flagmin-60;
                flaghour+=1;
            }
        }else{
            starttime = starttime+rt;
            flaghour = Math.floor(starttime/60);
            flagmin = starttime-60*flaghour;
            if(flagmin>=60){
                flagmin=flagmin-60;
                flaghour+=1;
            }
        }

        belltable[i]=flaghour+":"+flagmin;
    }
}
