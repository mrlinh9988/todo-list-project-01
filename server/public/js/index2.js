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
                        <td colspan="3">${i + 1}</td>
                        <td colspan="2" class="title">${element.title}</td>

                         <td>
                            <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="updateData(this, '${element._id}', '${element.title}')"><i class="material-icons"
                                data-toggle="tooltip" title="Edit" name="edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteData(this, '${element._id}')" ><i class="material-icons"
                                data-toggle="tooltip" title="Delete" name="delete">&#xE872;</i></a>
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
        itemsOnPage: 15,
        cssStyle: 'light-theme',
        onPageClick: function (pageNumber, event) {
            loadPage(pageNumber);
        },
        onInit: function () {

        },
        prevText: '<i class="glyphicon glyphicon-chevron-left"></i>',
        nextText: '<i class="glyphicon glyphicon-chevron-right"></i>',
        currentPage: 1
    });
}


function addData() {

    // $('#add-title-modal').html('Add new task')
    // $('#addModal').modal('show');
    $.ajax({
        url: '/api/product/',
        method: 'post',
        data: {
            title: $('#add-content').val()
        },
        dataType: 'json'
    }).then(data => {
        console.log(data);
        $('#addEmployeeModal').modal('hide');
    }).catch(err => console.log(err))

    // $('#btn-submit-add').off('click').on('click', function () {
    //     console.log('ok');

    // })

}


function updateData(target, id, title) {
    //$('#updateModalLabel').html('Id: ' + id)
    title = $('#' + id).find('.title').html();
    console.log(title);
    $('#update-content').val(title)

    console.log($('#update-content').val());
    // $('#updateModal').modal('show');
    $('#btn-submit-update').off('click').on('click', function () {

        $.ajax({
            url: '/api/product/' + id,
            method: 'put',
            data: {
                title: $('#update-content').val()
            },
            dataType: 'json'
        }).then(res => {
            $(target).parent().parent().find('.title').html(res.data.title)
            $('#editEmployeeModal').modal('hide')
            // $('#' + id).find('.title').html(res.data.title)

        }).catch(err => console.log(err))
    })
}

function deleteData(target, id) {
    $('#btn-submit-delete').on('click', function () {
        $.ajax({
            url: '/api/product/' + id,
            method: 'delete'
        }).then(data => {
            $(target).parent().parent().remove();
            $('#deleteEmployeeModal').modal('hide');
            console.log(data);
        }).catch(err => console.log(err))
    })
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

