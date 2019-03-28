function run() {
    $('.warning-container').hide();
    let id = 1;
    $(`#checkbox0`).on("change", function () {
        if (this.checked) {
            $(`#container0`).removeClass("disable");
            $(`#container0 input[type=number]`).removeAttr("disabled");
            $(`#container0 input[type=number]`).removeClass("dull-font");
        } else {
            $(`#container0`).addClass("disable");
            $(`#container0 input[type=number]`).attr('disabled', 'disabled');
            $(`#container0 input[type=number]`).addClass("dull-font");
        }
    });

    $("#plus").on("click", function (event) {
        $("#forms").append(`<div id="container${id}" class="form-container">
        <form action="">
            <input id="checkbox${id}" type="checkbox" checked="checked">
            <label>Odds</label>
            <input class="input-field odds" type="number"/>
            <label class="align-field">Win chance (%)</label>
            <input class="input-field chance" type="number"/>
            <label class="align-field2">Value</label>
            <input class="input-field edge edge${id}" type="number" disabled="disabled"/>
            <div id="${id}" class="minus-btn"><i class="fa fa-minus"></i></div>
        </form>
    </div>`);

        let idCopy = id++;
        $(`#${idCopy}`).on("click", function () {
            $(`#container${idCopy}`).addClass("disappear");
            setTimeout(function () {
                $(`#container${idCopy}`).remove();
            }, 200);
        });
        $(`#checkbox${idCopy}`).on("change", function () {
            if (this.checked) {
                $(`#container${idCopy}`).removeClass("disable");
                $(`#container${idCopy} input[type=number]`).removeAttr("disabled");
                $(`#container${idCopy} input[type=number]`).removeClass("dull-font");
            } else {
                $(`#container${idCopy}`).addClass("disable");
                $(`#container${idCopy} input[type=number]`).attr('disabled', 'disabled');
                $(`#container${idCopy} input[type=number]`).addClass("dull-font");
            }
        })
    });
    $(`.first-form input[type=checkbox]`).on("change", function () {
        if (this.checked) {
            $(`.first-form`).removeClass("disable");
            $(`.first-form input[type=number]`).removeAttr("disabled");
        } else {
            $(`.first-form`).addClass("disable");
            $(`.first-form input[type=number]`).attr('disabled', 'disabled');
        }
    });

    $(`#calculate`).on('click', function () {
        $('.warning-container').hide();
        let radioValue = $('input[name=system]:checked').val();
        console.log(radioValue)
        let totalOdds = 1;
        let arrayOdds = [];
        let arrayChance = [];
        let check = false;
        $(`.odds`).each(function (index, value) {
            if ($(`#container${index}`).hasClass("disable")) {
                totalOdds *= 1;
                arrayOdds.push(1);

            } else {

                if (radioValue === 'Decimal') {
                    if (this.value < 1.01 || this.value > 1000){
                        $(this).val(1.01);
                        check = true;
                    }
                    totalOdds *= this.value;
                    arrayOdds.push(this.value);
                } else if (radioValue === 'US') {
                    if (this.value < -10000 || this.value > 99900){
                        $(this).val(-1000);
                        check = true;
                    }
                    if (this.value < 0){
                        let decimal = (Math.abs((100 / this.value)) + 1).toFixed(2);
                        totalOdds *= decimal;
                        arrayOdds.push(decimal);
                    }else if (this.value >= 100){
                        let decimal = ((this.value / 100) + 1).toFixed(2);
                        totalOdds *= decimal;
                        arrayOdds.push(decimal);
                    }else{
                        let decimal = (2).toFixed(2);
                        totalOdds *= decimal;
                        arrayOdds.push(decimal);
                    }
                }
            }
        });
        if (check){
            $('.warning-container').show();
            return;
        }
        let totalOddsOriginal = totalOdds;
        if (radioValue === 'Decimal') {
            $(`.combined-odds`).val(totalOdds.toFixed(2));
        } else if (radioValue === 'US') {
            if (totalOdds >= 2){
                totalOdds = ((totalOdds - 1) * 100);
            }else{
                totalOdds = (-100/(totalOdds -1));
            }
            console.log(totalOddsOriginal)
            $(`.combined-odds`).val(totalOdds.toFixed(2));
        }

        let totalChance = 1;
        let checkChance = false;
        $(`.chance`).each(function (index, value) {
            if ($(`#container${index}`).hasClass("disable")) {
                totalChance *= 1;
                arrayChance.push(1)
            } else {
                if (this.value < 0.1 || this.value > 100){
                    checkChance = true;
                    $(this).val(0.1);
                }
                totalChance *= this.value / 100;
                arrayChance.push(this.value / 100);
            }

        });
        if (checkChance){
            $('.warning-container').show();
            return;
        }
        $(`.combined-chance`).val((totalChance * 100).toFixed(2));

        let totalValue = (((totalOddsOriginal - 1) * totalChance) - (1 - totalChance)).toFixed(2);

        $(`.expected-value`).val(totalValue);
        $(`.expected-value`).removeClass('neutral-number');
        $(`.expected-value`).removeClass('green-number');
        $(`.expected-value`).removeClass('red-number');
        if (totalValue < 0) {
            $(`.expected-value`).addClass('red-number');
        } else if (totalValue > 0) {
            $(`.expected-value`).addClass('green-number');
        } else {
            $(`.expected-value`).addClass('neutral-number');
        }

        $(`.edge`).each(function (index, value) {
            let currentValue = (((arrayOdds[index] - 1) * arrayChance[index]) - (1 - arrayChance[index])).toFixed(2);
            $(`.edge${index}`).removeClass('neutral-number');
            $(`.edge${index}`).removeClass('green-number');
            $(`.edge${index}`).removeClass('red-number');
            if (currentValue < 0) {
                $(`.edge${index}`).addClass('red-number');
            } else if (currentValue > 0) {
                $(`.edge${index}`).addClass('green-number');
            } else {
                $(`.edge${index}`).addClass('neutral-number');
            }
            this.value = currentValue;
        })
    });

    $(`#reset`).on('click', function () {
        $('.warning-container').hide();
        $(`.main-container input[type=number] `).each(function () {
            $(this).val('')
        });
        $(`.main-container input[type=text] `).each(function () {
            $(this).val('')
        });
    });
    $('input[type=radio]').on('change', function (index, value) {
        let radioValue = $('input[name=system]:checked').val();
        if (radioValue === "US"){
            $('.odds').each(function (index, value) {
                if ($(this).val()){
                    let odds = $(this).val();
                    if (odds >= 2){
                        $(this).val(((odds - 1) * 100).toFixed(2));
                    }else{
                        $(this).val(Math.floor(-100/(odds -1)).toFixed(2));
                    }
                }

            });
            $('.combined-odds').each(function (index, value) {
                if ($(this).val()){
                    let odds = $(this).val();
                    if (odds >= 2){
                        $(this).val(((odds - 1) * 100).toFixed(2));
                    }else{
                        $(this).val((-100/(odds -1)).toFixed(2));
                    }
                }
            });
        }else{
            $('.odds').each(function (index, value) {

                if ($(this).val()) {
                    let odds = $(this).val();
                    if (this.value < -100) {
                        $(this).val((Math.abs((100 / odds)) + 1).toFixed(2));
                    } else if(this.value >= 100){
                        $(this).val(((odds / 100) + 1).toFixed(2));
                    }else{
                        $(this).val(2.00);
                    }

                }
            });
            $('.combined-odds').each(function (index, value) {
                console.log(index)
                if ($(this).val()) {
                    let odds = $(this).val();
                    if (this.value < -100) {
                        $(this).val((Math.abs((100 / odds)) + 1).toFixed(2));
                    } else if(this.value >= 100){
                        $(this).val(((odds / 100) + 1).toFixed(2));
                    }else{
                        $(this).val(2.00);
                    }
                }
            })
        }
    })

}

function DoubleToFraction(num, epsilon, maxIterations) {
    num = num-1;
    let d = [];
    d[1] = 1;
    d[0] = 0;
    let z = num;
    let n = 1;
    let t = 1;

    let wholeNumberPart = Math.floor(num);
    let decimalNumberPart = num - wholeNumberPart;

    while (t < maxIterations && Math.abs(n / d[t] - num) > epsilon) {
        t += 1;
        if (z - Math.floor(z) !== 0){
            z = 1 / (z - Math.floor(z));
            d[t] = d[t - 1] * Math.floor(z) + d[t - 2];
            n = Math.floor(num * d[t] + 0.5)
        }else{
            d[t] = 1;
            n = num;
        }

    }
    let result = n + "/" + d[t];
    return result;
}