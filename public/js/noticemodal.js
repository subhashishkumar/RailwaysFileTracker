
$('#noticemodal').on('show.bs.modal', function(e) {
        var $modal = $(this)
        var noticeId = e.relatedTarget.id;
        var noticeTitle = $(e.relatedTarget).data('title');
        var noticeDescription = $(e.relatedTarget).data('description')

        //$modal.find('.edit-content').html(adI);
        $modal.find('#notice-heading').html(noticeId);
        $modal.find('#notice-title').html(noticeTitle);
        $modal.find('#notice-description').html(noticeDescription);
});

$('#billpayModal').on('show.bs.modal', function(e) {
        var $modal = $(this)
        var billId = $(e.relatedTarget).data('id');
        var hidden = $('<input type="hidden" name="bill_id" value="'+billId+'"/>');
        //$modal.find('.edit-content').html(adI);
        $modal.find('#bill-id').html(hidden);
});

$('#flatmodal').on('show.bs.modal', function(e) {
        var $modal = $(this);
        var flatId = e.relatedTarget.id;
        var flatMembers = $(e.relatedTarget).data('flat_members');
        var flatCaptain = $(e.relatedTarget).data('flat_captain');
        var members = $(e.relatedTarget).data('members');
        var area = $(e.relatedTarget).data('area');
        var dueAmount = $(e.relatedTarget).data('due_amount');
        var flatAddOn = $(e.relatedTarget).data('add_ons');
        var intercom = $(e.relatedTarget).data('intercom');
        var container = $('<select name="flat_captain" class="form-control">');
        $.each(flatMembers , function(i, user) {
          container.append("<option value="+user._id+">"+user.name+"</option>");
        });
        container.append("</select>");
        var hidden = $('<input type="hidden" name="flat_id" value="'+flatId+'"/>');
        var container1 = $('<input type="text" class="form-control" name="due_amount" value="'+dueAmount+'"/>');
        var container6 = $('<input type="text" class="form-control" name="intercom" value="'+intercom+'"/>');
        var container2 = $('<input type="text" class="form-control" name="flat_members" value="'+members+'"/>');
        var container3 = $('<input type="text" class="form-control" name="area" value="'+area+'"/>');
        var container4 = $('<label> Current Flat Captain : <strong>'+flatCaptain[0].name+'</strong></label>');
        var container5 = $('<h4> Add Ons </h4>');
        container5.append("<hr>");
        $.each(flatAddOn, function(i, addon){
          container5.append(
            "<div class = 'form-group'><label>"+addon.name+" Members </label><input type='text' class='form-control' name='"+addon.name+"' value='"+addon.members+"'/></div>");
        });
        $('#flat_captain').html(container);
        $('#due_amount').html(container1);
        $('#flat_members').html(container2);
        $('#area').html(container3);
        $('#current_captain').html(container4);
        $('#add_on').html(container5);
        $('#intercom').html(container6);
        $('#hidden').html(hidden);

});



$('#addoneditmodal').on('show.bs.modal', function(e){
    var name = $(e.relatedTarget).data('name');
    var unit = $(e.relatedTarget).data('unit');
    var rate = $(e.relatedTarget).data('rate');
    var hidden = $('<input type="hidden" name="name_original" value="'+name+'"/>');
    var container1 = $('<input type="text" class="form-control" name="name_new" value="'+name+'"/>');
    var container2 = $('<input type="text" class="form-control" name="rate" value="'+rate+'"/>');
    var container3 = $('<label> Rate ('+unit+')</label>');
    $('#addon_name').html(container1);
    $('#addon_rate').html(container2);
    $('#labelunit').html(container3);
    $('#hidden').html(hidden);
});

$('.remove').on('click', function () {
    return confirm('Are you sure?');
 });

$('input:radio[name="recepient"]').change(
    function(){
        var flatList = $.parseJSON(document.getElementById('flatListforbills').value) ;
        var groupList = $.parseJSON(document.getElementById('groupListforbills').value) ;
        if ($(this).is(':checked') && $(this).val() == 'individual') {
            var container = $('<div class="col-sm-12 form-control-label" style="margin-bottom: 0px; padding: 0px;"><label>Select Flat </label></div>');
            $("#recepientlistlabel").html(container);
            var container1 = $('<div class="col-sm-12 input" style="margin-bottom: 10px; padding: 0px;">');
            var container2 = $('<select id="flatlist" name="flat_id" class="chosen form-control" style="width:250px;" required><option></option>');
            $.each(flatList , function(i, flat) {
                container2.append("<option value="+flat._id+">"+flat.block+"-"+flat.floor+"."+flat.flat_number+"</option>");
            });
            container2.append("</select>");
            container1.append(container2);
            $("#recepientlist").html(container1);
            $(function(){
                $("#flatlist").chosen();
            });
        }
        else if ($(this).is(':checked') && $(this).val() == 'group'){
            var container = $('<div class="col-sm-12 form-control-label" style="margin: 0px; padding: 0px;"><label>Select Group </label></div>');
            $("#recepientlistlabel").html(container);
            var container1 = $('<div class="col-sm-4 input" style="margin-bottom: 10px; padding: 0px;">');
            var container2 = $('<select id="group_id" name="group_id" style="width:250px;" class="chosen form-control" required><option></option>');
            $.each(groupList , function(i, group) {
                container2.append("<option value="+group._id+">"+group.name+"</option>");
            });
            container2.append("</select>");
            container1.append(container2);
            $("#recepientlist").html(container1);
            $(function(){
                $("#group_id").chosen();
            });
        }
    });

  $('input:radio[name="givenTime"]').change(
      function(){
          if ($(this).is(':checked') && $(this).val() == 'selectDate') {
              // var container = $("<label>Expiry Date <div class="row">"+
              // "<div class="form-group">"+
              // "<input class="form-control" name="expirydate" type="date" data-validation="required"/>"+
              // "</div>"+"</div>"+"</label>");
              var cont = $('<br> <label>From  <div class="row"> <input type="date" class="form-control" style="margin-left:17px" name="from" required/> </div> </label> <label>To <div class="row"> <input type="date" class="form-control" style="margin-left:17px" name="to" required/> </div> </label>');
              $("#customDate").html(cont);
          }
          else if($(this).is(':checked')){
            var cont = $(" ");
            $("#customDate").html(cont);
          }
      });


$('input:radio[name="monthlybill"]').change(
    function(){
        if ($(this).is(':checked') && $(this).val() == 'yes') {
            var container = $('<div class="col-sm-12 form-control-label" style="margin: 0px; padding: 0px;"><label>Way of Calculation </label></div>');
            $("#monthlybilllogiclabel").html(container);
            var container2 = $('<select id="logicselect" name="logic" class="chosen form-control" style="width:250px;" required></select>');
            container2.append("<option></option><option>Area-wise</option><option>Fixed amount</option>");
            $("#monthlybilllogicselect").html(container2);
            $(function(){
                $("#logicselect").chosen();
            });
        }
        else if ($(this).is(':checked') && $(this).val() == 'no'){
            var container = $('<ul></ul>');
            $("#monthlybilllogiclabel").html(container);
            $("#monthlybilllogicselect").html(container);
            $("#monthlybilllogicrate").html(container);

        }
    });

$('#monthlybilllogicselect').on('change','#logicselect',function(){
    var logic = $(this).val();
    if(logic == 'Area-wise'){
        var container = $('<input type="text" class="form-control" data-validation-allowing="float" data-validation="number" name="logicrate" placeholder="Enter rate /sqft." required/>');
    }
     else if(logic == 'Fixed amount'){
        var container = $('<input type="text" class="form-control" data-validation-allowing="float" data-validation="number" name="logicrate" placeholder="Enter Amount per Flat." required/>');
     }
     else if(logic == 'Select One'){
        var container = $('<ul></ul>');
     }
     $("#monthlybilllogicrate").html(container);
});
$(document).ready(function() {
    var max_fields      = 5; //maximum input boxes allowed
    var wrapper         = $(".input_fields_wrap"); //Fields wrapper
    var add_button      = $(".add-field"); //Add button ID

    var x = 0; //initlal text box count
    $(add_button).click(function(e){ //on add input button click
        e.preventDefault();
        if(x < max_fields){ //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div class="row"><div class="col-lg-3"><input type="text" name="itemnames" placeholder="Enter Item Name" class="form-control form-control" required/></div>'+
                '<div class="col-lg-3"><input type="text" data-validation="number" name="itemrates" data-validation-allowing="float" data-validation="number" placeholder="Rate Here" class="form-control"/></div>'+
                '<div class="col-lg-3"><select id="itemunits" name="itemunits" class=" form-control" required><option></option><option value="/sqft./month">/sqft./month</option><option value="Fixed Amount">Fixed Amount</option></select></div>'+
                '<div class="col-lg-1" style="padding-left:18px;"><button title="Remove Item Field" type="button" class="btn btn-sm btn-danger remove_field"><i class="flaticon-delete"></i></button></div>'+
            '</div>');
        }
    });

    $(wrapper).on("click",".remove_field", function(e){ //user click on remove text
        e.preventDefault(); $(this).closest('.row').remove(); x--;
    })
});

$(function() {
      $('.chosen-select').chosen();
      $('.chosen-select-deselect').chosen({ allow_single_deselect: true });
});


$("#selectgroup").change(
    function(){
        var allflats = $.parseJSON(document.getElementById('flats').value) ;
        var groupid = $(this).val();
        $.get( '/admin/groups/flats',{ groupid: groupid }, function(flats) {
            var flatsforedit= [];
            $.each(flats,function (index, flat) {
                flatsforedit.push(flat._id);
            });
            $('#editgroup').val(flatsforedit).trigger('chosen:updated');
        });
    });

$('#resetedit').on('click', function () {
    $('#editgroup option').prop('selected', false).trigger('chosen:updated');
    $('#selectgroup option').prop('selected', false).trigger('chosen:updated');
 });

$('#resetcreate').on('click', function () {
    $('#addflat option').prop('selected', false).trigger('chosen:updated');
    var field= document.getElementById('name');
    field.value= field.defaultValue;
 });


$('.reset').on('click', function () {
    $(this).closest('form').find("input[type=text], textarea, input[type=password]").val("");
 });


$.validate({
    lang: 'en',
    modules : 'security'
  });
