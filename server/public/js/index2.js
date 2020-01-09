// scroll ifinity
// $.window().scroll(function(){
//     var windowHeight = $(this).height();
//     console.log(windowHeight);
// })

// BY KAREN GRIGORYAN
// console.log(getArrCookie());
// getArrCookie().pop()

function getArrCookie() {
    let arrCookie = document.cookie.split('; ')
    return arrCookie.map(function (e) {
        let cookie = e.split('=');
        return {
            key: cookie[0],
            value: cookie[1]
        }
    })
}

// ==============================================================================
// PAGINATION

$('#btn-login').click(function () {
    window.location.href = '/login'
});



var hash = window.location.hash || "#page-1";

hash = hash.match(/^#page-(\d+)$/);

var num = parseInt(hash[1]);
console.log(num);
loadPage(num);

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
                        
                        <td colspan="3" class="title">${element.title}</td>

                         <td colspan="2">
                            <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="updateData(this, '${element._id}', '${element.title}')"><i class="material-icons"
                                data-toggle="tooltip" title="Edit" name="edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteData(this, '${element._id}')" ><i class="material-icons"
                                data-toggle="tooltip" title="Delete" name="delete">&#xE872;</i></a>
                            <a href="#detailEmployeeModal" data-toggle="modal" onclick="detailData('${element._id}')" ><i class="fas fa-info-circle"></i></a>
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
        currentPage: num
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
    }).then(res => {
        if (res.status) {
            alert('Guest can not add new record')
        } else {
            $('#add-content').val('')
            console.log(res.data[0].title);
            $('#addEmployeeModal').modal('hide');
            $('#content').append(`
                    <tr id="${res.data[0]._id}">
                      
                        <td colspan="3" class="title">${res.data[0].title}</td>
                        <td colspan="2" >
                            <a href="#editEmployeeModal" class="edit" data-toggle="modal" onclick="updateData(this, '${res.data[0]._id}', '${res.data[0].title}')"><i class="material-icons"
                                data-toggle="tooltip" title="Edit" name="edit">&#xE254;</i></a>
                            <a href="#deleteEmployeeModal" class="delete" data-toggle="modal" onclick="deleteData('${res.data[0]._id}')" ><i class="material-icons"
                                data-toggle="tooltip" name="detail">&#xE872;</i></a>
                            <a href="#detailEmployeeModal" data-toggle="modal" onclick="detailData('${res.data[0]._id}')" ><i class="fas fa-info-circle"></i></a>
                        </td>
                    </tr>
                `)
        }

    }).catch(err => console.log(err))

    $.ajax({
        url: '/api/product/get/count',
        method: 'get'
    }).then(totalRecord => {
        loadPagination(totalRecord)
    })

    // $('#btn-submit-add').off('click').on('click', function () {
    //     console.log('ok');

    // })

}


function updateData(target, id, title) {
    //$('#updateModalLabel').html('Id: ' + id)
    title = $('#' + id).find('.title').html();
    // console.log(title);
    $('#update-content').val(title)

    // console.log($('#update-content').val());
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
            if (res.status) {
                alert(res.message)
            } else {
                $(target).parent().parent().find('.title').html(res.data.title)
                $('#editEmployeeModal').modal('hide')
            }

            // $('#' + id).find('.title').html(res.data.title)

        }).catch(err => console.log(err))
    })
}

function deleteData(target, id) {
    $('#btn-submit-delete').on('click', function () {
        $.ajax({
            url: '/api/product/' + id,
            method: 'delete'
        }).then(res => {
            if (res.status) {
                alert(res.message)
            } else {
                $(target).parent().parent().remove();
                $('#deleteEmployeeModal').modal('hide');
            }

        }).catch(err => console.log(err))
    })
}

function detailData(id) {

    console.log(id);
    $.ajax({
        url: '/api/product/' + id,
        method: 'get'
    }).then(data => {
        console.log(data);
        $('#content-detail').html(`
            <tr>
                <td colspan="2">${data.title}</td>
                <td>${data.createdAt}</td>
            </tr>
        `)

    }).catch(err => console.log(err))

}

