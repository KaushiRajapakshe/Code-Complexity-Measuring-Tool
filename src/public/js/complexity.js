
$(function () {
    $("#header").load("views/header.html");
    $("#footer").load("views/footer.html");
});

const clickMe = () => {
    alert("Code Complexity values successfully added to the database!")
}

var complexityObject;

$('#fileUploader').on('change', uploadFile)

function uploadFile(event) {
    event.stopPropagation();
    event.preventDefault();
    var files = event.target.files;
    var data = new FormData();
    $.each(files, function (key, value) {
        data.append(key, value);
    });
    loadetable(data, files);
}
function printData() {
    var divToPrint = document.getElementById("example");
    newWin = window.open("");
    newWin.document.write(divToPrint.outerHTML);
    newWin.document.title = "Code Complexity"
    newWin.print();
    newWin.close();
}

function loadetable(data, files) {
    document.getElementById("chart-0").innerHTML = "";
    let nestchart = new Array();
    let sizecountchart = new Array();
    let lines = new Array();
    let inhechart = new Array();
    let ctcchart = new Array();
    let twchart = new Array();
    let cpschart = new Array();
    let crchart = new Array();
    let cp = 0;
    let csv = 0;
    let ctsv = 0;
    let cpsv = 0;
    let cncv = 0;
    let civ = 0;
    let twv = 0;
    let crv = 0;
    $.ajax({
        url: 'http://localhost:8087/ServletFileUploard',
        type: 'POST',
        data: data,
        cache: false,
        dataType: 'json',
        processData: false,
        contentType: false,
        success: function (data, textStatus, jqXHR) {

            $("#example > tbody").html("");

            for (var i = 0; i < data.length; i++) {


                lines.push('L:' + (i + 1));
                if (data[i].nextcount == "") {
                    nestchart.push(0);
                } else {
                    nestchart.push(parseInt(data[i].nextcount, 10));
                    cncv += parseInt(data[i].nextcount, 10);
                }

                if (data[i].inheritcount == "") {
                    inhechart.push(0);
                } else {
                    inhechart.push(parseInt(data[i].inheritcount, 10));
                    civ += parseInt(data[i].inheritcount, 10);
                }
                if (data[i].ctc == "") {
                    ctcchart.push(0);
                } else {
                    ctcchart.push(parseInt(data[i].ctc, 10));
                    ctsv += parseInt(data[i].ctc, 10);
                }

                let si = "";
                if (data[i].sizecount != 0) {
                    si = data[i].sizecount;
                    csv += parseInt(data[i].sizecount, 10);
                }

                sizecountchart.push(data[i].sizecount);

                let tw = ctcchart[ctcchart.length - 1] + nestchart[nestchart.length - 1] + inhechart[inhechart.length - 1];
                twchart.push(tw);
                twv += tw;

                let cps = tw * sizecountchart[sizecountchart.length - 1];
                cpschart.push(cps);

                let cr = 0;

                if (data[i].re == false) {
                    cr = cps * 2;
                    crchart.push(cr);
                } else {
                    cr = "";
                    crchart.push(0);
                }
                if (typeof cps === 'number') {
                    cps = parseInt(cps);
                    cpsv += cps;
                } else {
                    cps = 0;
                }
                if (typeof cr === 'number') {
                    cr = parseInt(cr);
                    crv += cr;
                } else {
                    cr = 0;
                }
                if (typeof cp === 'number') {
                    cp = parseInt(cp);
                    cp = cp + cps + cr;
                }
                if (cps == 0) {
                    cps = "";
                }
                if (tw == 0) {
                    tw = "";
                }
                if (cr == 0) {
                    cr = "";
                }

                var tab = '';
                tab += "<tr class=' text-dark'>";
                tab += "<td>";
                tab += i + 1;
                tab += "</td>"
                tab += "<td>";
                tab += data[i].code;
                tab += "</td>";
                tab += "<td>";
                tab += data[i].sizeall;
                tab += "</td>";
                tab += "<td>";
                tab += si;
                tab += "</td>";
                tab += "<td>";
                tab += data[i].ctc;
                tab += "</td>";
                tab += "<td>";
                tab += data[i].nextcount;
                tab += "</td>";
                tab += "<td>";
                tab += data[i].inheritcount;
                tab += "</td>";
                tab += "<td>";
                tab += tw;
                tab += "</td>";
                tab += "<td>";
                tab += cps;
                tab += "</td>";
                tab += "<td>";
                tab += cr;
                tab += "</td>";
                tab += "</tr>";
                $('#example > tbody').append(tab);
            }

            let tabtotal = "";
            tabtotal += "<tr  class='text-dark'>";
            tabtotal += "<td align='center' colspan='3'>";
            tabtotal += "Cp";
            tabtotal += "</td>";
            tabtotal += "<td align='center' colspan='7'>";
            tabtotal += cp;
            tabtotal += "</td>";
            tabtotal += "</tr>";
            $('#example > tbody').append(tabtotal);
            let footer = ""
            footer += "<tr>"
            footer += "<td width='3%'></td>"
            footer += "<td width='46%'>Total Code Complexity Count</td>"
            footer += "<td width='30%'></td>"
            footer += "<td width='3%'>"
            footer += csv
            footer += "</td>"
            footer += "<td width='3%'>"
            footer += ctsv
            footer += "</td>"
            footer += "<td width='3%'>"
            footer += cncv
            footer += "</td>"
            footer += "<td width='3%'>"
            footer += civ
            footer += "</td>"
            footer += "<td width='3%'>"
            footer += twv
            footer += "</td>"
            footer += "<td width='3%'>"
            footer += cpsv
            footer += "</td>"
            footer += "<td width='3%'>"
            footer += crv
            footer += "</td>"
            footer += "</tr>"
            $("#example > tfoot").html("");
            $('#example > tfoot').append(footer);

            var date = new Date();
            console.log("files", files)
            const extentionjava = "java";
            const extentiontext = "txt";
            const pattern1 = new RegExp('\\b' + extentionjava + '\\b', 'i');
            const pattern2 = new RegExp('\\b' + extentiontext + '\\b', 'i');
            const exists1 = pattern1.test(files[0].name);
            const exists2 = pattern1.test(files[0].name);
            var extention = "";
            if (exists1 == true)
                extention = 'java';
            else if (exists2 == true)
                extention = 'text'
            else
                extention = ''
            if (localStorage.getItem('filename') !== null) {
                localStorage.removeItem('filename');
            }
            localStorage.setItem('filename', files[0].name);

            complexityObject = {
                filename: files[0].name,
                extentiontype: extention,
                addedtime: date,
                lastupdatetime: date,
                // origionalfile: JSON.parse(files),
                type: 'text/plain',
                // upadatedfile: JSON.parse(files),
                status: 'Active',
                complexitycodeoutput: {
                    'Cs': csv,
                    'Ctc': ctsv,
                    'Cnc': cncv,
                    'Ci': civ,
                    'TW': twv,
                    'Cps': cpsv,
                    'Cr': crv,
                    'Cp': cp
                },
                factors: [
                    'Cs', 'Ctc', 'Cnc', 'Ci', 'TW', 'Cps', 'Cr', 'Cp'
                ],
                version: 1,
                filestatus: 'Active',
                id: localStorage.getItem("id")
            }

            var options = {
                maintainAspectRatio: false,
                spanGaps: false,
                elements: {
                    line: {
                        tension: 0.000001
                    }
                },
                plugins: {
                    filler: {
                        propagate: false
                    }
                },
                scales: {
                    xAxes: [{
                        ticks: {
                            autoSkip: false,
                            maxRotation: 0
                        }
                    }]
                }
            };


            document.getElementById("chart-0").innerHTML = "";
            console.log(lines.length);
            console.log(lines);
            console.log(nestchart.length);

            console.log(nestchart);

            new Chart('chart-0', {
                type: 'line',
                data: {
                    labels: lines,
                    datasets: [{
                        backgroundColor: '#FFA5B4',
                        borderColor: '#FB052E',
                        data: nestchart,
                        label: 'CNC',
                        fill: false
                    }, {
                        backgroundColor: '#81F781',
                        borderColor: '#01DF01',
                        data: sizecountchart,
                        label: 'Cs',
                        fill: false
                    }, {
                        backgroundColor: '#FAFD7E',
                        borderColor: '#F7FE01',
                        data: inhechart,
                        label: 'Ci',
                        fill: false
                    }, {
                        backgroundColor: '#968DFD',
                        borderColor: '#1804FB',
                        data: ctcchart,
                        label: 'Ctc',
                        fill: false
                    }, {
                        backgroundColor: '#FBB3D6',
                        borderColor: '#FB037B',
                        data: twchart,
                        label: 'tw',
                        fill: false
                    }, {
                        backgroundColor: '#FEC892',
                        borderColor: '#F77C02',
                        data: cpschart,
                        label: 'cps',
                        fill: false
                    }, {
                        backgroundColor: '#96FCE6',
                        borderColor: '#03FBC5',
                        data: crchart,
                        label: 'cr',
                        fill: false
                    }]
                },
                options: Chart.helpers.merge(options, {
                    title: {
                        text: 'Chart: ',
                        display: true
                    }
                })
            });


        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }

    });

}

const postComplexity = (complexityObject) => {
    $.post({
        url: '/api/complexity',
        data: complexityObject,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            // location.reload();
        }
    })
}

const postMeasuringFactors = (complexityFactors) => {
    $.post({
        url: '/api/complexity/factors',
        data: complexityFactors,
        type: 'POST',
        success: (result) => {
            alert(result.message);
            location.href = '/recomplexity';
        }
    })
}

$(document).ready(function () {
    $('#save').click(() => {
        const id = localStorage.getItem('id');
        postComplexity(complexityObject);

        var factorstatus = 'system';
        var complexityFactorObj = {
            'Cs': true,
            'Cts': true,
            'Cnc': true,
            'Ci': true,
            'Tw': true,
            'Cps': true,
            'Cr': true,
            'Cp': true,
            id: id,
            factorstatus
        }
        postMeasuringFactors(complexityFactorObj);
    });
});
