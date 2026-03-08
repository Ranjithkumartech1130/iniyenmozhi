const url = "https://script.google.com/macros/s/AKfycbzmoffNVdNlMp2oB8RKB7bX1ZrEwJuMcpGguTLOH8fOop3N2O--uX3pE9D1ca91I_ob/exec";
const data = new URLSearchParams();
data.append("FullName", "TestName");

fetch(url, {
    method: "POST",
    body: data
}).then(r => r.text()).then(t => {
    console.log(t.substring(0, 500));
}).catch(e => console.error(e));
