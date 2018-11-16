$(() => {
    $(document).ready(() => {
      render();
    });
  
    const renderTables = (outputElement, dataList) => {
      dataList.reverse();
      dataList.forEach(e => {
          const output = $(outputElement);
          const listItem = $(`<li class='list-group-item mt-4' id='${e._id}'>`);
          let checkedBoolean;
          (e.compeleted === false)? checkedBoolean = false: checkedBoolean = true;
          listItem.append(
            $("<input type='checkbox' id='checkboxId'>").prop( "checked", checkedBoolean ),
            $("<p>").text(e.task),
            $("<button style='font-size:24px' class='fas fa-times' id='removeBtn'>").text('')
          );
  
          output.append(listItem);
      });
  
    }
  
    const render = function () {
      $('#inputTxtId').val('');
      $.ajax({ url: "/api/todolist", method: "GET" })
        .then((todoList) => {
         renderTables('#todo', todoList);
        });
    }
  
    const addNewTask = function () {
        event.preventDefault();
        newTask = {
          task: $('#inputTxtId').val(),
          compeleted: false
        }
        
        switch(true){
          case ((newTask.task).trim() !== ''):
              $.ajax({ url: "/api/addNewTask", method: "POST", data: newTask}).then(() => {
                $("#inputTxtId").empty();
                $("#todo").empty();
                render();
                });
          break;
          default:
              alert('fill task on text place then add please');
          break;
        }
    }
  
    $("#addBtn").on("click", addNewTask);
     
  
    const removeTask = function () {
      event.preventDefault();
  
      taskDel = {
        task_id: String($(this).parent().attr('id'))
      }
      
      $.ajax({url: `/api/selected/${taskDel.task_id}`,  method: "GET"}).then(function(selected) {
          if(selected.compeleted === false){
            const result = confirm("Are you sure to delete?");
            if (result) {
              $.ajax({url: "/api/removeTask",  method: "DELETE", data: taskDel}).then(function() {
                $("#todo").empty();
                  render();
                });
            }
          }else{
            $.ajax({url: "/api/removeTask",  method: "DELETE", data: taskDel}).then(function() {
              $("#todo").empty();
                render();
              });
          }
        });
      }
  
    $('#todo').on('click','#removeBtn' , removeTask);
  
    const updateTask = function () {
      event.preventDefault();
  
      taskDel = {
        task_id: String($(this).parent().attr('id')),
        compeleted: String($(this).prop( "checked"))
      }
  
      $.ajax({url: "/api/updateTask",  method: "PUT", data: taskDel}).then(function() {
        $("#todo").empty();
          render();
        });
      }
  
    $('#todo').on('click','#checkboxId' , updateTask);  
  })