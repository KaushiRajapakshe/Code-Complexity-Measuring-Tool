
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

$('#print').on('click', function () {
    printData();
})

document.getElementById("csv").addEventListener("click", function () {
    var table = document.getElementById("example");
    var csv = [];
    for (var i = 0; i < table.rows.length; i++) {
        var row = [];
        for (var j = 0; j < table.rows[i].cells.length; j++) {
            var cellContent = table.rows[i].cells[j].textContent;
            if (cellContent.includes(',')) {
                cellContent = '"' + cellContent + '"';
            }
            row.push(cellContent);
        }
        csv.push(row.join(","));
    }
    var csvString = csv.join("\n");
    var blob = new Blob([csvString], { type: "text/csv;charset=utf-8" });
    var link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = "table_data.csv";
    link.click();
});

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
            complexityObject = {
                filename: files[0].name,
                extentiontype: 'java',
                addedtime: date,
                lastupdatetime: date,
                origionalfile: files[0].result,
                type: 'text/plain',
                upadatedfile: files[0].result,
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
                    'Cs', 'Ctc', 'Cnc', 'Ci', 'TW', 'Cps', 'Cr, Cp'
                ],
                version: 1,
                filestatus: 'Active'
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



        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log('ERRORS: ' + textStatus);
            console.log(errorThrown);
            console.log(jqXHR);
        }

    });

}
var idof;
$(document).ready(function () {
    // $('#save').click(() => {
    //     const id = localStorage.getItem('id');
    //     postComplexity(complexityObject);
    // });
    const id = localStorage.getItem('id');

    const filename = localStorage.getItem('filename');
    // Use fs module

    // var data = new FormData();
    // $.each(files, function (key, value) {
    //     data.append(key, value);
    // });
    // loadetable(data, files)
    


    $('#update').click(() => {
        var Cs = document.getElementById("Cs");
        var Cts = document.getElementById("Cts");
        var Cnc = document.getElementById("Cnc");
        var Ci = document.getElementById("Ci");
        var Tw = document.getElementById("Tw");
        var Cps = document.getElementById("Cps");
        var Cr = document.getElementById("Cr");
        var Cp = document.getElementById("Cp");
        var cs, cts, cnc, ci, tw, cps, cr, cp;

        const complexityFactors = Object.create(null);
        if (Cs.checked == true) {
            cs = true
        } else {
            cs = false
        }
        if (Cts.checked == true) {
            cts = true;
        } else {
            cts = false;
        }
        if (Cnc.checked == true) {
            cnc = true;
        } else {
            cnc = false;
        }
        if (Ci.checked == true) {
            ci = true;
        } else {
            ci = false;
        }
        if (Tw.checked == true) {
            tw = true;
        } else {
            tw = false;
        }
        if (Cps.checked == true) {
            cps = true;
        } else {
            cps = false;
        }
        if (Cr.checked == true) {
            cr = true;
        } else {
            cr = false;
        }
        if (Cp.checked == true) {
            cp = true;
        } else {
            cp = false;
        }
        var complexityFactorObj = {
            'Cs': cs,
            'Cts': cts,
            'Cnc': cnc,
            'Ci': ci,
            'Tw': tw,
            'Cps': cps,
            'Cr': cr,
            'Cp': cp,
            id: id,
            _id: idof,
            factorstatus: 'user'
        }
        
        updateMeasuringFactors(complexityFactorObj);
    });
    $('#delete').click(() => {
        deleteMeasuringFactors({_id: idof});
    });
    getMeasuringFactors({ id: id });
});

const postMeasuringFactors = (complexityFactors) => {
    $.post({
        url: '/api/complexity/factors',
        data: complexityFactors,
        type: 'POST',
        success: (result) => {
            alert(result.message);
        }
    })
}

const getMeasuringFactors = (id) => {
    $.get({
        url: '/api/complexity/factors',
        type: 'GET',
        data: id,
        success: (result) => {
            var Cs = document.getElementById("Cs");
            var Cts = document.getElementById("Cts");
            var Cnc = document.getElementById("Cnc");
            var Ci = document.getElementById("Ci");
            var Tw = document.getElementById("Tw");
            var Cps = document.getElementById("Cps");
            var Cr = document.getElementById("Cr");
            var Cp = document.getElementById("Cp");
            Cs.checked = result.data.Cs
            Ci.checked = result.data.Ci
            Cts.checked = result.data.Cts
            Cnc.checked = result.data.Cnc
            Tw.checked = result.data.Tw
            Cps.checked = result.data.Cps
            Cr.checked = result.data.Cr
            Cp.checked = result.data.Cp
            idof = result.data._id
        }


    })
}

const updateMeasuringFactors = (complexityFactors) => {
    $.post({
        url: '/api/complexity/factors',
        data: complexityFactors,
        type: 'POST',
        success: (result) => {
            alert("Update factor "+complexityFactors._id+"'s factors of complexity success");
        }
    })
}

const deleteMeasuringFactors = (_id) => {
    $.ajax({
        url: '/api/complexity/factors',
        data: _id,
        type: 'DELETE',
        success: (result) => {
            alert(result.message);
        }
    })
}
