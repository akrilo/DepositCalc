new AirDatepicker('#date');

function strip_tags(string) {
    return string.replace(/<\/?[^>]+>/gi, '');
}

$('#checkbox').click(function() {
    if ($(this).is(':checked')) {
        $('#labelHide').show(100);
    } else {
        $('#labelHide').hide(100);
    }
});

$(document).ready(function() {

});

$(".container").submit(function(e) {

    e.preventDefault();

    $(".container").validate({
        rules: {
            date: {
                required: true,
                date: true,
            },
            sum: {
                required: true,
                range: [1000, 3000000],
            },
            percent: {
                required: true,
                digits: true,
                range: [3, 100],
            },
            sumAdd: {
                range: [0, 3000000],
            },
            limit: {
                required: true,
                range: [1, 60],
            },
        },
        messages: {
            date: {
                required: "Это поле обязательно для заполнения",
                date: "Некорректная дата",
            },
            sum: {
                required: "Это поле обязательно для заполнения",
                range: "Сумма вклада должна быть от 1000 до 3000000",
            },
            percent: {
                required: "Это поле обязательно для заполнения",
                digits: "Процентная ставка, % годовых должна быть целым числом",
                range: "Процентная ставка, % годовых должна быть от 3 до 100",
            },
            sumAdd: {
                range: "Сумма пополнения вклада  должна быть от 0 до 3000000",
            },
            limit: {
                required: "Это поле обязательно для заполнения",
                range: "Срок вклада должен быть от 1 до 60 месяцев",
            },
        }
    });
    if ($('#select').val() == "month") {
        var month = $('#limit').val();
    } else {
        var month = $('#limit').val() * 12;
    }

    $('#line').remove();
    $('#payment').remove();

    if (!strip_tags($("#sumAdd").val()).trim()) {
        var sumAdd = 0;
    } else {
        var sumAdd = $('#sumAdd').val();
    }

    var formula = {
        startDate: $('#date').val(),
        sum: $('#sum').val(),
        term: month,
        percent: $('#percent').val(),
        sumAdd: sumAdd
    }

    var formData = JSON.stringify(formula);

    $.ajax({
        type: "POST",
        url: "calc.php",
        dataType: "JSON",
        data: { formData },
        success: function(response) {
            var jsonData = JSON.parse(response);
            $("form").append("<hr id='line'><label class='label' id='payment'>Сумма к выплате<label id='result'>&#8381; </label></label>");
            $("#result").append(jsonData);
        },
        error: function() {
            alert('Некорректные данные');
        }


    });



    var form = $(this);

    // $.ajax({
    //     type: "POST",
    //     url: 'calc.php',
    //     data: form.serialize(),
    //     success: function(data) {
    //         alert(data);
    //     }
    // });
});