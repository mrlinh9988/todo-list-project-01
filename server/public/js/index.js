// scroll ifinity
// $.window().scroll(function(){
//     var windowHeight = $(this).height();
//     console.log(windowHeight);
// })

// BY KAREN GRIGORYAN



// ==============================================================================
// PAGINATION

loadPage(1);

$.ajax({
    url: '/api/product/get/count',
    method: 'get'
}).then(totalRecord => {
    loadPagination(totalRecord)
})



function loadPage(pageNumber) {
    $.ajax({
        url: '/api/product?page=' + pageNumber,
        method: 'get'
    }).then(data => {
        $('#content').html('');
        for (let i = 0; i < data.length; i++) {
            const element = data[i];
            $('#content').append(`
                    <tr id="${element._id}">
                        <td >${i + 1}</td>
                        <td class="title">${element.title}</td>
                        <td class="d-flex justify-content-center">
                            <button class="btn btn-outline-success mr-2" id="btn-update" name="btn-update" onclick="updateData(this, '${element._id}', '${element.title}')">Update</button>
                            <button class="btn btn-outline-primary mr-2" id="btn-delete" name="btn-delete" onclick="deleteData(this, '${element._id}')">Delete</button>
                            <button class="btn btn-outline-info" data-toggle="modal" data-target="#modalCart" onclick="detailData('${element._id}')">Detail</button>
                        </td>
                    </tr>
                `)
        }

        // loadPagination(totalRecord);
    })
}

function loadPagination(totalRecord) {
    $('#paging').pagination({
        items: totalRecord,
        itemsOnPage: 10,
        cssStyle: 'light-theme',
        onPageClick: function (pageNumber, event) {
            loadPage(pageNumber);
        },
        onInit: function () {

        },
        prevText: '<i class="fas fa-chevron-left"></i>',
        nextText: '<i class="fas fa-chevron-right"></i>',
        currentPage: 1
    });
}


function addData() {

    $('#add-title-modal').html('Add new task')
    $('#addModal').modal('show');

    $('#btn-submit-add').off('click').on('click', function () {
        $.ajax({
            url: '/api/product/',
            method: 'post',
            data: {
                title: $('#add-content').val()
            },
            dataType: 'json'
        }).then(data => {
            console.log(data);
        }).catch(err => console.log(err))
    })

}


function updateData(target, id, title) {
    $('#updateModalLabel').html('Id: ' + id)
    title = $('#' + id).find('.title').html();
    $('#update-content').val(title)
    $('#updateModal').modal('show');
    $('#btn-submit-update').off('click').on('click', function () {
        $.ajax({
            url: '/api/product/' + id,
            method: 'put',
            data: {
                title: $('#update-content').val()
            },
            dataType: 'json'
        }).then(res => {
            console.log($('#' + id).find('.title').html());
            $('#' + id).find('.title').html(res.data.title)
            
        }).catch(err => console.log(err))
    })
}

function deleteData(target, id) {
    $.ajax({
        url: '/api/product/' + id,
        method: 'delete'
    }).then(data => {
        $(target).parent().parent().remove()
        console.log(data);
    }).catch(err => console.log(err))

}

function detailData(id) {

    $('#myModalLabel').html('Id: ' + id)
    $.ajax({
        url: '/api/product/' + id,
        method: 'get'
    }).then(data => {
        // console.log(moment(data.createdAt).get('date'));
        // console.log(moment(data.createdAt).get('month') + 1);
        // console.log(moment(data.createdAt).get('year'));
        // console.log(moment(data.createdAt).get('hour'));
        // console.log(moment(data.createdAt).get('minute'));
        $('#detail-content').html(`
            <tr>
                <td>${data.title}</td>
                <td>${data.createdAt}</td>
            </tr>
        `)

    }).catch(err => console.log(err))

}

