//往路発車時刻データ
const Otimes = {
    "千歳駅": ["7:48","7:58","8:23","8:30","9:00","9:37","10:00","10:12","11:00","11:39","12:15","12:30","12:45","13:20","14:28","15:25","16:15","17:18","18:00"
],
   "南千歳駅":["7:52","8:08","8:19","8:33","8:40","8:40","9:10","9:28","10:00","10:10","10:22","10:22","10:58","11:10","11:49","12:25","12:40","12:55","13:30","14:38","15:35","16:25","17:28","18:10"
],
    "実験棟":["8:03","8:00","8:16","8:27","8:41","8:48","8:48","9:18","9:36","9:52","10:08","10:18","10:30","10:30","11:06","11:18","11:57","12:33","12:48","13:03","13:04","13:38","14:46","15:43","16:33","17:36","18:18"
],
    "本部棟":["8:06","8:03","8:19","8:30","8:44","8:51","8:51","9:21","9:39","9:55","10:11","10:21","10:33","10:33","11:09","11:21","12:00","12:36","12:51","13:06","13:07","13:41","14:49","15:46","16:36","17:39","18:21"
]}
const Ftimes = {
    "本部棟":["10:45","11:34","12:22","12:26","13:00","13:07","13:43","14:16","14:50","14:52","14:56","15:00","15:40","16:07","16:38","16:40","16:45","17:17","17:35","17:53","18:22","18:26","18:29","18:47","19:04","19:29","20:13","21:08","21:53"
],
    "実験棟": ["10:48","11:37","12:25","12:29","13:03","13:10","13:46","14:19","14:53","14:55","14:59","15:03","15:43","16:10","16:41","16:43","16:50","17:20","17:38","17:56","18:25","18:29","18:32","18:50","19:07","19:32","20:16","21:11","21:56"
],
    "南千歳駅": ["10:56","11:45","12:33","12:37","13:18","13:54","14:27","15:03","15:07","15:11","15:51","16:18","16:49","16:51","16:55","16:58","17:28","17:46","18:04","18:33","18:37","18:40","18:58","19:15","19:40","20:24","21:19","22:04"
],
    "千歳駅": ["11:06","11:55","12:43","12:47","13:28","14:04","14:37","15:13","15:17","15:21","16:01","16:28","16:59","17:05","17:08","17:38","17:56","18:14","18:43","18:50","19:08","19:25","19:50","20:34","21:29","22:14"
]}

  // 出発駅が選ばれたとき
  function selectDep(place) {
    if (place == "千歳駅"){
        dep = 0;
    }
    else if (place == "南千歳駅"){
        dep = 1;
    }
    else if (place == "実験棟"){
        dep = 2;
    }
    else if (place == "本部棟"){
        dep = 3;
    }


// 目的地のボタンに切り替え
    document.getElementById("question").textContent = "目的地を選んでください";
    document.getElementById("choices").innerHTML = `
    <button onclick="selectDis('千歳駅')">千歳駅</button>
      <button onclick="selectDis('南千歳駅')">南千歳駅</button>
      <button onclick="selectDis('本部棟')">本部棟</button>
      <button onclick="selectDis('実験棟')">実験棟</button>
    `;

    document.getElementById("kekka").textContent = place + " >>>>>> ";
    shuppatu = place

}



 // 到着駅が選ばれたとき
 function selectDis(place) {
    const now = new Date();
    const nowMinutes = now.getHours() * 60 + now.getMinutes();
    if (place == "千歳駅"){
        dis = 0;
    }
    else if (place == "南千歳駅"){
        dis = 1;
    }
    else if (place == "実験棟"){
        dis = 2;
    }
    else if (place == "本部棟"){
        dis = 3;
    }

    if (dep - dis < 0){
        times = Otimes
    }
    else if (dep - dis > 0){
        times = Ftimes
    }
    else {
        document.getElementById("kekka").textContent = "error";
    }
    toutyaku = place
    document.getElementById("kekka").textContent = shuppatu + " >>>>>> " + toutyaku;

    // 文字列 → 分に変換
    const schedule = times[shuppatu].map(t => {
      const [h, m] = t.split(":").map(Number);
      return h * 60 + m;
    });
  
    // 今より後の時刻だけ
    const upcoming = schedule.filter(min => min > nowMinutes);
  
    const resultDiv = document.getElementById("kekka");
  
    if (upcoming.length > 0) {
      const nextTime = upcoming[0];
      const next01Time = upcoming[1];
      const waitMinutes = nextTime - nowMinutes;
      const hours01 =Math.floor(next01Time / 60);
      const hours = Math.floor(nextTime / 60);
      const minutes01 = next01Time % 60;
      const minutes = nextTime % 60;

      document.getElementById("choices").innerHTML = `
    <h3>" "<h3>
    `;
  
      resultDiv.innerHTML = `
        <p><strong>現在時刻：</strong> ${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}</p>
        <p><strong>乗車場所：</strong> ${shuppatu}</p>
        <p><strong>次のバス：</strong> ${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}</p>
        <p><strong>あと ${waitMinutes} 分後に出発です！</strong></p>
        <p><strong>その後のバス </strong> ${hours01.toString().padStart(2, "0")}:${minutes01.toString().padStart(2, "0")}</p>
      `;
    } else {
      resultDiv.innerHTML = `<p><strong>本日運行終了しました。</strong></p>`;
    }
}