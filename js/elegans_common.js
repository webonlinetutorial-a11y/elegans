encodeHTML = function(string) {
  const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      "/": '&#x2F;',
  };
  const reg = /[&<>"'/]/ig;
  return string.replace(reg, (match)=>(map[match]));
}

Elegans = Elegans || {};
Elegans.utils = Elegans.utils || {};

Elegans.utils.encodeHTML = function(param) {
    if(!param) {
        return param;
    }
    return param.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;');
};

Elegans.utils.removeScriptFromHtml = function(param){
    if(!param){
        return param
    }

    return param.replace(/script/gi, 'clearjs');
};

Elegans.utils.removeClearJs = function(){
	if($('clearjs').length){
		$('clearjs').remove();
	}
    
};

var loc = location;

var url_ga = window.location.hash;
if (url_ga.indexOf('#_ga') !== -1) {
	window.history.replaceState({}, '',window.location.pathname+window.location.search)
}

var Elegans = Elegans || {};
Elegans.ga_clients = Elegans.ga_clients || [];
Elegans.ga = (function(){
  var clients = [];
  var load = function() {
   
  }


  var createTrackers = function(){
   
  }

  var addClients = function(propertyid,name){
    clients.push([propertyid,name]);  
  }

  var sendGA = function(_hitType, paramObj)
  {
 
  }
    var setGA = function(key, val) {
       

    }
  return{
    load        : load,
    sendGA      : sendGA,
    setGA       : setGA
  }
})();
 

var _loggedin_user = [];
var _loggedin_user_user_script_executed =0;
var _gbl_logincb_fn = '';
var _gbl_notlogincb_fn = '';
var _is_loggedin = 0;
var _gbl_red_url = '';
var aliasTags = "";
var profileComplete = false;
var isExecuteTagService = '1';
var gsMonthNames = new Array('January','February','March','April','May','June','July','August','September','October','November','December');
var gsDayNames = new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday');
if(typeof B2B_SSO_LOGIN == 'undefined')B2B_SSO_LOGIN=0;
Date.prototype.format = function(f){
    if (!this.valueOf())
        return '&nbsp;';

    var d = this;

    return f.replace(/(yyyy|mmmm|mmm|mm|dddd|ddd|dd|hh|nn|ss|a\/p)/g,
        function($1)
        {
            switch ($1.toLowerCase())
            {
            case 'yyyy': return d.getFullYear();
            case 'mmmm': return gsMonthNames[d.getMonth()];
            case 'mmm':  return gsMonthNames[d.getMonth()].substr(0, 3);
            case 'mm':   return ((d.getMonth() + 1) < 10) ? ('0'+(d.getMonth() + 1)) : (d.getMonth() + 1);
            case 'dddd': return gsDayNames[d.getDay()];
            case 'ddd':  return gsDayNames[d.getDay()].substr(0, 3);
            case 'dd':   return (d.getDate() < 10) ? ('0'+d.getDate()) : (d.getDate());
            case 'hh':   return ((h = d.getHours() % 12) ? h : 12);
            case 'nn':   return d.getMinutes();
            case 'ss':   return d.getSeconds();
            case 'a/p':  return d.getHours() < 12 ? 'AM' : 'PM';
            }
        }
    );
}

var postMessageCallbacks = {};
executeOnReady(function(){
	postMessageCallbacks['multiple_logins_alert'] = multiple_logins_alert;	
	postMessageCallbacks['handle_login_error'] = handle_login_error;	
	postMessageCallbacks['handle_fb_loggedin'] = handle_fb_loggedin;	
	postMessageCallbacks['handle_login_result'] = handle_login_result;	
	postMessageCallbacks['handle_googlelogin_accesstokenurl'] = handle_googlelogin_accesstokenurl;
});

window.customAddEventListener = window.attachEvent || window.addEventListener;
window.customAddEventListener('message', function (ev) {
	if(typeof ev.data.callback !='undefined' && typeof postMessageCallbacks[ev.data.callback] == 'function')
	postMessageCallbacks[ev.data.callback].apply(null, Array.prototype.slice.call(ev.data.params instanceof Array?ev.data.params:[]));
}, false);


function htmlspecialchars(str) {
	if (typeof(str) == "string") {
		str = str.replace(/&/g, "&amp;"); /* must do &amp; first */
		str = str.replace(/"/g, "&quot;");
		str = str.replace(/'/g, "&#039;");
		str = str.replace(/</g, "&lt;");
		str = str.replace(/>/g, "&gt;");
	}
	return str;
}

function rhtmlspecialchars(str) {
	if (typeof(str) == "string") {
		str = str.replace(/&gt;/ig, ">");
		str = str.replace(/&lt;/ig, "<");
		str = str.replace(/&#039;/g, "'");
		str = str.replace(/&quot;/ig, '"');
		str = str.replace(/&amp;/ig, '&'); /* must do &amp; last */
	}
	return str;
}
 
var myInt;
function getQueryParams(qs) {
    qs = qs.split("+").join(" ");
    var params = {},
        tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

function ck_en(str){
	if(str){
		var new_str='+';
		for(var i=0;i<str.length;i++){
			new_str+=String.fromCharCode(str.charCodeAt(i) +7);
		}	
		return new_str;
	}else{
		return null;
	}
}

function ck_de(str){
	if(str){
		if(str[0]=='+'){
		var new_str='';
		for(var i=1;i<str.length;i++){
			new_str+=String.fromCharCode(str.charCodeAt(i) -7);
		}	
			return new_str;
		}else{
			return str;
		}
	}else{
		return null;
	}
}
var location_srch = Elegans.utils.encodeHTML(document.location.search);
var $_GET = getQueryParams(location_srch);
var globalLoc = Elegans.utils.encodeHTML($(loc).attr('pathname'));
//alert(JSON.stringify($_GET));
//alert($_GET['test']);

var hoverTimeoutId = null;
var hoverTimeoutIdSearch = null;

// MOVED TO HEADER
/* var _oauth_data={};
var prevent_default_layers=false;
var _override_history_url=''; */

var _relvideo={};
var is_vslide_on=false;
var is_sslide_on=false;
var last_search_val='';
var search_requests=[];
var _profile_email='';
var _refresh_page = null;
var preventOverRideHistoryState=0;

var loginUrl_facebook = 'https://www.facebook.com/dialog/oauth?client_id='+FACEBOOK_APPID+'&redirect_uri='+base_url+'%2Fshare_settings.php%3Ftype%3Dfb%26connect_type%3Dfb&scope=email%2C+user_education_history%2C+user_hometown%2C+user_location%2C+user_work_history%2C+publish_actions'; 
	
var loginUrl_linkedin = base_url+'/share_settings.php?connect_type=in&lType=initiate&reconnect=true'; 

var gbl_lyr_xtra_cls = '';
var gbl_lyr_close = '';
var reg_red_thanks = 'N';
var two_col_rt = '';
var yoloFlag;
var slikeApi = (slike_api_key)?slike_api_key[(deviceType=='desktop')?'web':'mweb']:'tnr120web5afx9k9l99';
var videoid = (window.videoid)?window.videoid:'';
var slikePlay = false;
var posterUrl = window.posterUrl;
var $slikeAudio = false;

// setting cookie email
var pEmail_arr = ck_de(getCookie(ET_PORTAL+'_pop_user_sub'));
var pEmail='';
if($_GET['email']){
	pEmail = $.trim($_GET['email']);
}else if(pEmail_arr){
	pEmail_arr = pEmail_arr.split('|');
	pEmail = pEmail_arr[0];
}

//setting User Id for GA
if(typeof ga == "function" && pEmail) { 
	Elegans.ga.setGA('userId',ck_en(pEmail));
}

var set_cookie_email = pEmail;
//var set_cookie_email = $_GET['email'];
if(set_cookie_email){
	set_cookie_email = set_cookie_email;
} else {
	set_cookie_email = 'newuser';
}

var sub_source = $.trim($_GET['utm_medium']);
if (sub_source) {
	setCookie(ET_PORTAL + '_subscription_source', sub_source, ET_SUB_SOURCE_COOKIE);
}

// two_col_rt and launching related was set at this point now in header

var set_pop_cookie = 'N';
var fromMail_redirect_flag = 'N';
var forward_blk = '';
	
var show_subscription_layer_timeout;

//var ET_DEFAULT_IMG_URL = '';


var callbackFunctionStack = [];
callbackFunctionStack.captcha = [];
callbackFunctionStack.csrf = [];

executeArrayBasedFunction = function(){
	if((typeof arguments != 'undefined') && (typeof arguments[0] != 'undefined') && arguments[0].length){
		$func = arguments[0][0];
		$func.apply(null, Array.prototype.slice.call(arguments[0],1));
	}
}

//loadScript(JS_PATH+'/../js/app.security.js?mod=' + file_version,function(){},false);

function getCookie(c_name){
	if(isGDPRNation())
	return b2bGdpr.getStorage(c_name);
	var c_value = Elegans.utils.removeScriptFromHtml(document.cookie);
	var c_start = c_value.indexOf(" " + c_name + "=");
	if (c_start == -1){
		c_start = c_value.indexOf(c_name + "=");
	}
	if (c_start == -1){
		c_value = null;
	} else {
		c_start = c_value.indexOf("=", c_start) + 1;
		var c_end = c_value.indexOf(";", c_start);
		if (c_end == -1){
			c_end = c_value.length;
		}
		c_value = unescape(c_value.substring(c_start,c_end));
	}
	return c_value;
}

function setCookie(c_name, value, exdays){
	if(isGDPRNation())
	{
		if(exdays < 0 || exdays == 0)
		return b2bGdpr.deleteStorage(key);
		else
		return b2bGdpr.setStorage(c_name, value, exdays);
	}
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value = escape(value) + ((exdays==null) ? "" : "; path=/; domain="+COOKIE_SET_DOMAIN+"; expires="+exdate.toUTCString());				  
	document.cookie=c_name + "=" + c_value;
}
function setLocalStorage(key,data,exdays){
	var $data = {};
	$data['expires'] = Math.floor(Date.now() / 1000) + exdays*24*60*60;
	$data['data'] = data;
	localStorage.setItem(key,JSON.stringify($data)); 
}
function getLocalStorage(key){
	var $data = localStorage.getItem(key);
	if($data !=null)
	{
		$data = JSON.parse($data);
		var lsexpires = $data['expires'];
		if(Math.floor(Date.now() / 1000) >= lsexpires)
		{
			deleteLocalStorage(key);
			return null;
		}
		if('data' in $data)
			return $data['data'];
		else
		{
			deleteLocalStorage(key);
			return null;
		}
	}
	else 
	return null;
}
function deleteLocalStorage(key){
	localStorage.removeItem(key);
}
function isValidEmailAddress(emailAddress) {
	var pattern = new RegExp(/^[+a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i);
	return pattern.test(emailAddress);
} 
function validate_mobile(mob_number){
    var error='';
    var regex = /^([\d\+\-\(\)]){8,15}$/;
    mob_number=mob_number.replace(/ /g,'');
    if(mob_number == ""){
      //error=Elegans.errorLog[61];
      return false;
    }
    else if(!regex.test(mob_number)){
      //error=Elegans.errorLog[64];
      return false;
    }    
    return true;
}
function save_techgig_updates_subsription(blockPosition, lid) {

	if(show_subscription_layer_timeout)clearTimeout(show_subscription_layer_timeout);
	var email = $.trim($('#subscribe_email_'+blockPosition).val());
	var full_name = $('#full_name_'+blockPosition).val();
	var company = $('#subscribe_company_'+blockPosition).val();
	var designation = $('#subscribe_desig_'+blockPosition).val();
	var mobile = $('#subscribe_mobile_'+blockPosition).val();
	var newsletter_id=$('#newsletter_id_'+blockPosition).val();
	var user_consent = $('#consentPopup_'+blockPosition).is(":checked");
	
    if(!full_name){
		full_name = '';
	}
	if(!company){
		company = '';
	}
	if(!designation){
		designation = '';
	}
	if(!mobile){
		mobile = '';
	}
	
    var emailField = $('#subscribe_email_'+blockPosition);
	var emailFieldResponse = $('#subcribe_response_'+blockPosition);
	var full_nameField = $('#full_name_'+blockPosition);
	var subscriber_cmp = $('#subscribe_company_'+blockPosition);
	var subscriber_desig = $('#subscribe_desig_'+blockPosition);
	var subscriber_mobile = $('#subscribe_mobile_'+blockPosition);
	var consent_response = $('#subcribe_consentPopup_'+blockPosition);

	var subscription_source = '';
	emailFieldResponse.html('');
	var c_value = getCookie(ET_PORTAL + '_subscription_source');
	if(c_value){
		subscription_source = c_value;
	}

	if (sub_source) {
		subscription_source = sub_source;
	}
	
	var subscription_source_form = $.trim($('#subscription_source').val());
	if(subscription_source_form){
		subscription_source = subscription_source_form;
	} 
	
	email.replace(/ /g,'');
	if(email == 'Your email' || email.length == 0) {
		emailFieldResponse.html('Please provide your email id.');
		emailField.val('');
		emailField.focus();
		return false;
	}

	// Validate Email Max Length
	if(email.length > 100) { 
		emailFieldResponse.html('Email length can not be more than 100 chars.');
		//emailField.val('');
		emailField.focus();
		return false;
	}

	if(email.replace(/ /g,'') == "") {
		emailFieldResponse.html('Please provide an Email id.');
		emailField.val('');
		emailField.focus();
		return false;
	}
	
	if(is_valid_email(email)){
		// email is valid
	} else {
		emailFieldResponse.html('Please provide a valid Email id.');
		//emailField.val('');
		emailField.focus();
		return false;
	}
	if(!user_consent){
      consent_response.html('Please read and agree to the Terms & Conditions and Privacy Policy');
      return false;
    }
    if(user_consent){
      consent_response.html('');
      $('#consentPopup_'+blockPosition).prop('checked', false);
    }
	
    // Pip Check
    var newsletterId    = 0;
    var pipCategoryId   = 0;
    var pipCategory     = '';
    
    if(is_pip)
    {
        newsletterId    = pip.newsletterId;
        pipCategoryId   = pip.categoryId;
        pipCategory     = pip.category;
        SITE_NAME_TITLE = SITE_NAME_TITLE + ' : ' + pipCategory;
    }

    var url = base_url + '/general_ajax_task.php?action=save_etretail_subsription_block';
	$('#save_techgig_updates_subsription_btn, #subscriber_btn_top').attr('disabled', true);
	
	$.ajax({url:url, type: "POST", data: {'email_id':email,'full_name':full_name, 'subscription_source':subscription_source, 'company':company, 'designation':designation,'mobile':mobile, 'newsletter_id':newsletter_id, 'pipCategoryId':pipCategoryId, 'pipCategory':pipCategory}, xhrFields: { withCredentials: true }, success: function(data) { 
        customPopUpMessage      = '';
        subscriptionMessage     = '';
        textSeprator            = '<br>';
        profileCompletedCounter = 0;
        emailVerifiedCounter    = 0; 
        emailNotVerifiedCounter = 0;
        data                    = $.trim(data);
        responseData            = $.parseJSON(data);
        
        _remove_custom_poplayer2(lid, true);
        
        // Show popup box based on response
		if(responseData.status == 'EMAIL_INVALID') { // Email is invalid
			errorMessageField.html('Please provide valid Email id.');
		} else if(responseData.status == 'EMAIL_BLOCKED') { // Email is blocked
			
			var newlid = _custom_poplayer2('<span style="color:#000;">We have sent an activation mail to your mailbox for email confirmation.<span>', '', '', '', 3, '', true);
			$('#_l2_txt_cnt_'+newlid).html('<span class="subtitle">You have unsubscribed from our newsletter earlier.<br /> Please click on the link in the mailer to re-activate your subscription.</span>');

		} else { // Email is valid
            
            // For Demo Site
            if(typeof demosite!='undefined' && demosite == 1) {
                var newlid = _custom_poplayer2('Thank you for subscribing. We are launching soon. Stay tuned!', '', '', '', 3, '', true);
                $('#_l2_txt_cnt_'+newlid).html('');
                return;
            }
            
            _profile_email = responseData.email;
            
            customPopUpMessage  = '<span style="color:#000;">Thank you for subscribing.</span> '+textSeprator;
            var newlid = _custom_poplayer2(customPopUpMessage, '', '', '', 3, '', true);
            
            // Iterate multiple newsletter and prepare message
            $.each(responseData.newsletterDetails, function( newsletterKey, newsletterValue ) {
                
                // If user is existing
                if(isNaN(newsletterValue.responseId) && newsletterValue.responseId == 'E') {

                        // Email check
                        if(newsletterValue.isEmailVerified == 'Y') { // email verified
                            
                            if (emailVerifiedCounter == 0) {
                                subscriptionMessage += '<span class="subtitle"> In case you do not receive our newsletters, please reach us on <a target="_blank" href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '" >' + CONTACTUS_EMAILS[ET_PORTAL] + '</a>. Do not forget to check your SPAM folder.</span>'+textSeprator;
                                emailVerifiedCounter++;
                            }
                            
                        } else if (newsletterValue.isEmailVerified == 'N') { // email not verified
                        
                            if (emailNotVerifiedCounter == 0) {
                                subscriptionMessage += '<span class="subtitle">We have sent you an email with verification link. Please click on it to verify your email.</span>'+textSeprator;
                                emailNotVerifiedCounter++;
                            }

                        } // end if email check

                    if (newsletterValue.isProfileCompleted == 'N' && profileCompletedCounter == 0) { //  profile not completed

                        subscriptionMessage += '<span class="subtitle">We would like to know you a little more to serve you better:</span><div id="detail-submit-form"><form action="" method="post" onsubmit="javascript:return false;"><div class="section"><label for="layer_full_name">Full Name <span>*</span></label><input id="layer_full_name" name="layer_full_name" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="layer_full_name_err" style="display: none;"></span></div><div class="section"><label for="current_company">Company <span>*</span></label><input value=""  id="current_company" name="current_company" type="text" class="txt_box popup-autocomplete" onblur="removeError(event);"/><span class="error-txt" id="current_company_err" style="display: none;"></span><input type="hidden" name="master_company_id" class="autocomplete-master-id"></div><div class="section"><label for="user_designation">Designation <span>*</span></label><input value=""  id="user_designation" name="user_designation" type="text" class="txt_box" onblur="removeError(event);"/><span class="error-txt" id="user_designation_err" style="display: none;"></span></div><!--<div class="section"><label for="mobile_no">Mobile Number <span>*</span></label><input value=""  id="mobile_no" name="mobile_no" type="text" class="txt_box" onblur="removeError(event);"/><span class="error-txt" id="mobile_no_err" style="display: none;"></span></div><div class="section"><label for="user_work_exp">Location <span>*</span></label><input value="" id="user_work_exp" name="user_work_exp" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="user_work_exp_err" style="display: none;"></span></div><br class="clear">--><div class="section"><label for="mobile_no">Mobile Number <span>*</span></label><input value="" id="mobile_no" name="mobile_no" type="text" class="txt_box" value="" onblur="removeError(event);"/><span class="error-txt" id="mobile_no_err" style="display: none;"></span></div><div style="max-width:85px;margin:0 auto 15px;"><input id="updateUserSubscriptionDetails_btn" onclick="javascript:updateUserSubscriptionDetails(\''+newlid+'\');" type="submit" value="Submit" class="submit-button2" /><a onclick="javascript: _remove_custom_poplayer2('+newlid+');" href="javascript:void(0);" class="skip" style="display:inline-block; line-height:32px; margin-left:10px; font-size:12px;">Skip this</a></div><i class="privacy-icon"></i><p>Your detail will be safe with us. You will only receive the emails that you permitted upon subscription.You can unsubscribe at anytime.</p></form></div>';
                        profileCompletedCounter++;
                    }

                } else { // If user is freshly inserted or updated

                    // Email check
                    if(newsletterValue.isEmailVerified == 'Y') { // email verified

                        if (emailVerifiedCounter == 0) {
                            subscriptionMessage += '<span class="subtitle">In case you do not receive our newsletters, please reach us on <a target="_blank" href="mailto:' + CONTACTUS_EMAILS[ET_PORTAL] + '" >' + CONTACTUS_EMAILS[ET_PORTAL] + '</a>. Do not forget to check your SPAM folder.</span>';
                            emailVerifiedCounter++;
                        }

                    } else if (newsletterValue.isEmailVerified == 'N') { // email not verified

                        if (emailNotVerifiedCounter == 0) {
                            subscriptionMessage += '<span class="subtitle">We have sent you an email with verification link. Please click on it to verify your email.</span>'+textSeprator;
                            emailNotVerifiedCounter++;
                        }

                    } // end if email check
                }
     
            }); // end foreach
           
            $('#_l2_txt_cnt_'+newlid).html(subscriptionMessage);
            set_popup_position(newlid);

            var source = 'direct';
            if ( typeof $_GET['utm_source'] === 'undefined' || $_GET['utm_source'] === null ){
                source = 'direct_'+ec_detail_file; 
            } else {
                source = $_GET['utm_source']+'_'+ec_detail_file; 
            }

            ga('send', 'event', 'Newsletter_Signup', 'Position_top',source );
        }
        $('#subsfrm_'+blockPosition).hide();
        $('#sbtn_'+blockPosition).show();
        $('#consent_'+blockPosition+' input').prop('checked', true);
		$('#save_techgig_updates_subsription_btn, #subscriber_btn_top').attr('disabled', false);
        emailField.val('');
        $('#saveSubscribeToMultipleNewsletters').attr('disabled', false);
         

        if(lid){
            if(forward_blk){
                window.location = $.trim($_GET['source']);
            }
        }
    }

	});
	return false;
}

function updateUserSubscriptionDetails(lid) {	
	deleteLocalStorage('userData');
	//var user_work_exp = $.trim($('#user_work_exp').val());
	var user_work_exp = getUserLocation();	
	var current_company = $.trim($('#current_company').val());
	var master_company_id = $.trim($('.autocomplete-master-id').val());
	var user_designation = $.trim($('#user_designation').val());
	var layer_full_name = $.trim($('#layer_full_name').val());
	var mobile_no = $.trim($('#mobile_no').val());	
	
	current_company.replace(/ /g,'');
	user_designation.replace(/ /g,'');
	layer_full_name.replace(/ /g,'');
	user_work_exp.replace(/ /g,'');
	master_company_id.replace(/ /g,'');
	mobile_no.replace(/ /g,'');
	
	var tmpEmail = _profile_email;
	var url = base_url+"/general_ajax_task.php?action=update_user_etretail_subsription_data";
	
	if(layer_full_name)$('#layer_full_name_err').html('').hide();
	if(current_company)$('#current_company_err').html('').hide();
	if(user_designation)$('#user_designation_err').html('').hide();
	if(user_work_exp)$('#user_work_exp_err').html('').hide();
	if(mobile_no)$('#mobile_no_err').html('').hide();
	
	if(!layer_full_name){
		$('#layer_full_name').parent().addClass('error');
		$('#layer_full_name_err').html('Please provide your Full Name.').show();
	}
	if(!current_company){
		$('#current_company').parent().addClass('error');
		$('#current_company_err').html('Please provide your Company name.').show();
	}
	if(!user_designation){
		$('#user_designation').parent().addClass('error');
		$('#user_designation_err').html('Please provide your Designation.').show();
	}
	 
	if(!mobile_no){
		$('#mobile_no').parent().addClass('error');
		$('#mobile_no_err').html('Please provide your mobile number.').show();
	}
	if(mobile_no){
		if(!validate_mobile(mobile_no)){
			$('#mobile_no').parent().addClass('error');
			$('#mobile_no_err').html('Please provide valid number.').show();
		}
	}
	
	if(!layer_full_name){
		//alert('Please provide your Name');		
		$('#layer_full_name').focus();
		return false;
	} else if(!current_company){
		//alert('Please provide your Company');
		$('#current_company').focus();
		return false;
	} else if(!user_designation){
		//alert('Please provide your Designation');
		$('#user_designation').focus();
		return false;
	} /*else if(!user_work_exp){
		//alert('Please provide your Location');
		$('#user_work_exp').focus();
		return false;
	}*/ else if(!mobile_no){
		//alert('Please provide your Mobile Number');
		$('#mobile_no').focus();
		return false;
	} else if(mobile_no){
		//alert('Please provide your Mobile Number');
		if(!validate_mobile(mobile_no)){
			$('#mobile_no').focus();
			return false;
		}
	}
	
	$('#updateUserSubscriptionDetails_btn').attr('disabled', true);
	
	$.ajax({url:url, type:"POST", xhrFields: { withCredentials: true }, data: {'email':tmpEmail, 'user_work_exp':user_work_exp, 'current_company':current_company, 'master_company_id':master_company_id, 'user_designation':user_designation, 'layer_full_name':layer_full_name, 'mobile_no':mobile_no}, success: function(data) {
		data = $.trim(data);
		data = data.split('#|#');
 		if(fromMail_redirect_flag == 'Y') {
			$('#_l2_ttl_'+lid).html('Thank you. <br />Redirecting...');
			$('#_l2_txt_cnt_'+lid).hide();
			window.location.href = $.trim($_GET['source']);
			return false;
		}

		if(data[0].length > 0) {
			//set_popup_position(lid);
			if(data[0] > 0) {

			 
				$('#_l2_ttl_'+lid).text('Thanks for your details.');
				$('#_l2_txt_cnt_'+lid).html(Elegans.utils.removeScriptFromHtml('<span class="subtitle">We hope you will like the newsletters. If you have any feedback, please reach us on <a href="mailto:' + Elagan.utils.encodeHTML(CONTACTUS_EMAILS[ET_PORTAL]) + '">' + CONTACTUS_EMAILS[ET_PORTAL](CONTACTUS_EMAILS[ET_PORTAL]) + '</a></span>'));
				profileComplete = false; 
	            $('.l2_outer_bx').removeClass("none_closable");

			} else if(data[0] == 'E') {
				
				$('#_l2_ttl_'+lid).text('Thanks for your details.');
				$('#_l2_txt_cnt_'+lid).html(Elegans.utils.removeScriptFromHtml('<span class="subtitle">We hope you will like the newsletters. If you have any feedback, please reach us on <a href="mailto:' + Elagan.utils.encodeHTML(CONTACTUS_EMAILS[ET_PORTAL]) + '">' + Elagan.utils.encodeHTML(CONTACTUS_EMAILS[ET_PORTAL]) + '</a></span>'));
				
			 
				profileComplete = false; 
	            $('.l2_outer_bx').removeClass("none_closable");
			} else { 

			 

					_remove_custom_poplayer2(lid);
					profileComplete = false; 
	            	$('.l2_outer_bx').removeClass("none_closable");

				//} 
			}
			$(document).trigger($.Event('_gbl_profile_form_submitted'));
			check_login_status();
		}
		$('#updateUserSubscriptionDetails_btn').attr('disabled', false);
	}
	});
}


 
try{
	$(window).load(function() {		
		initUnveilImg();
	});
}catch(e){}

// sharing functions
function facebook_share(link_url, image_url, title, description) {
	if($('#custom_social_message').length && $('#custom_social_message').html()!=''){
		description=$('#custom_social_message').html();
	}
	//var url = 'http://www.facebook.com/sharer.php?s=100&p[title]='+title+'&p[summary]='+description+'&p[url]='+link_url+'&p[images][0]='+image_url;
	//var url='https://www.facebook.com/dialog/feed?app_id='+FACEBOOK_APPID+'&display=popup&name='+title+'&description='+description+'&link='+link_url+'&redirect_uri='+link_url+'&picture='+image_url;
	var url='http://www.facebook.com/sharer.php?app_id='+FACEBOOK_APPID+'&u='+link_url+'&title='+title+'&display=popup&ref=plugin&src=share_button';
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function twitter_share(title, link_url, tw_handle) {
	tw_handle = tw_handle ? tw_handle : '';
	if($('#custom_social_message').length && $('#custom_social_message').html()!=''){
		title=$('#custom_social_message').html();
	}
	var url = 'https://twitter.com/intent/tweet?text='+title+'&tw_p=tweetbutton&url='+link_url+'&via='+tw_handle
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function linkedin_share(title, link_url, summary, source) {
	if($('#custom_social_message').length && $('#custom_social_message').html()!=''){
		title=$('#custom_social_message').html();
	}
	var url = 'http://www.linkedin.com/shareArticle?mini=true&url='+link_url+'&title='+title+'&summary='+summary+'&source='+source;
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function googleplus_share(title, link_url, summary) {
	var url = 'http://plus.google.com/share?url='+link_url;
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function whatsapp_share(title, link_url, summary) {
	if($('#custom_social_message').length && $('#custom_social_message').html()!=''){
		title=$('#custom_social_message').html();
	}
	var url = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text=' + title +' - ' +encodeURIComponent(link_url);
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function facebook_share_new(sh_title, sh_description, sh_url, sh_pic) {
	url='https://www.facebook.com/dialog/feed?app_id='+FACEBOOK_APPID+'&display=popup&name='+sh_title+'&description='+sh_description+'&link='+sh_url+'&redirect_uri='+sh_url+'&picture='+sh_pic;
	window.open(url, 'sharer' + getRandomInt(1000,9999), 'toolbar=0,status=0,width=548,height=325');
	return false;
}

function getRandomInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function openWindow(url,name,specs){
	window.open(url, ((name=='sharer')?'sharer'+getRandomInt(1000,9999):name), specs);
}

function search_content(id){ 
	var content = $.trim($('#'+id).val()); 
	$('#'+id).val(content);
	if(!content) return false;
	content = content.replace(/\s+/g, '+').toLowerCase();
	var encodedStr = encodeURIComponent(content).replace(/'/g, "%27");
	encodedStr = encodedStr.replace(/%2B/g,'+');
	loc = base_url+"/search/"+encodedStr;
}

function send_tip() { 

	var tip_type = $.trim($('input[name=tiptype]:checked', '#tipform').val()); 
	var tip_user = $.trim($('#tip_user').val());
	var tip_email = $.trim($('#tip_email').val());
	var tip_desc = $.trim($('#tip_desc').val());
	var tip_title = '';
	var error = false;
    var pipCategoryId = $.trim($('#pipCategoryId').val());
	
    $('#tip_user, #tip_email, #tip_desc').removeClass('error');
	if(!tip_user) {
		$('#tip_user').addClass('error');
		error = true;
	}

	if(!tip_email) {
		$('#tip_email').addClass('error');
		error = true;
	}

	if(!tip_desc) {
		$('#tip_desc').addClass('error');
		error = true;
	}

	if(error == false){ 
		var url = base_url+"/general_ajax_task.php?action=save_tip";
		$.post(url,{'tip_type':tip_type, 'tip_user':tip_user, 'tip_email':tip_email, 'tip_title':tip_title, 'tip_desc':tip_desc, 'pipCategoryId':pipCategoryId},function(data) {

			data = data.split('#|#');

			if(data[0].length > 0) { 
				if($.trim(data[0]) == 'success'){ 
					$('.tip .inner').slideUp();
					$('#tip_user').val('');
					$('#tip_email').val('');
					$('#tip_desc').val('');
					$('#pitch_box').fadeOut();
					$('#pitch_success').fadeIn();
				} else if($.trim(data[1]) == 'email'){
					$('#tip_email').addClass('error');
				}
			}
		});
	}  

	return false;
}
var login_popup_screens = {};
var login_popup_display_type = 1;
login_popup_screens['screen1'] = {};
login_popup_screens['screen1']['html'] = ['<div class="terms">By continuing, I agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms of Service</a> and <a href="'+base_url+'/privacy_policy.php" target="_blank">Privacy Policy</a>.</div><div class="connect_btns"><a onclick="login_with_linkedin()" class="connect_btn"><i class="fa fa-linkedin-square"></i>Continue with Linkedin</a><span class="or">or</span><a onclick="login_with_facebook()" class="connect_btn"><i class="fa fa-facebook-square"></i>Continue with Facebook</a><br /><a onclick="login_with_google()" class="connect_btn"><i class="fa fa-google"></i>Continue with Google</a></div><div class="ftr"><h4>Why do I need to sign in?</h4><p>This will help us serve you better and provide you a personalized experience.</p></div>'];
login_popup_screens['screen1']['links'] = ['<a class="login_link" onclick="javascript:switch_screen(\'screen2\')" href="#">I Have '+SITE_NAME_TITLE+' Account</a><span>&bull;</span><a onclick="javascript:switch_screen(\'screen3\')" class="login_link" href="#" >Sign Up With Email</a>'];

login_popup_screens['screen2'] = {};
login_popup_screens['screen2']['html'] = ['<div id="login-form"><h3>LOGIN</h3> <p id="log_main_err" class="error error_info"></p>  <div class="section"><input type="email" id="log_email" placeholder="Email" class="txt_box" value="">   <i class="fa fa-envelope"></i><p id="log_email_err" class="error"></p></div>  <div class="section">   <input type="password" id="log_pswd" placeholder="Password" class="txt_box">   <i class="fa fa-lock"></i> <p id="log_pswd_err" class="error"></p>  </div>  <div class="section">   <label for="remember_me" class="remember"><input type="checkbox" id="remember_me" checked=""> Remember me</label></div><div class="section">   <a id="forgot_pswd_link" class="forgot">Forgot password?</a>   <input type="submit" id="log_submit" class="submit-button2 disabled" onclick="login_user(1);" value="Login">   </div> <p class="tos">By logging in you indicate that you have read and agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms of Service</a> and <a href="'+base_url+'/privacy_policy.php" target="_blank">Privacy Policy</a>.</p></div><div id="forgot_psswrd" style="display:none;">    <h3>Please enter your E-mail Id</h3>    <p id="main_err_frgt_pwd" class="success_msg"></p>    <div class="section">        <input id="frgt_pswd_email" type="email" placeholder="Email" class="txt_box" value="" />        <i class="fa fa-envelope"></i>        <p class="error" id="frgt_email_err"></p>    </div>    <div class="section">        <a id="login_back_link" class="backto-login">Back to login</a>        <input type="submit"  class="submit-button2" value="Send" onclick="forgot_password();" />    </div></div>'];
login_popup_screens['screen2']['links'] = ['<a class="login_link" onclick="javascript:switch_screen(\'screen1\')" href="#">Login With Social Accounts</a><span>&bull;</span><a class="login_link" onclick="javascript:switch_screen(\'screen3\')" href="#" >Sign Up With Email</a>'];

login_popup_screens['screen3'] = {};
login_popup_screens['screen3']['html'] = ['<div id="signup-form" style=""><h3>SIGNUP</h3><p id="main_err" class="error error_info"></p><div class="section clearfix">  <label for="registration_name">Full Name</label>  <input type="text" name="registration_name" id="registration_name" placeholder="Name" class="txt_box"><p id="reg_name_err" class="error"></p></div><div class="section clearfix">  <label for="registration_email">Email</label>  <input type="email" name="registration_email" id="registration_email" placeholder="Email" class="txt_box"> <p id="reg_email_err" class="error"></p>  </div>   <div class="section clearfix">  <label for="registration_password">Password</label>  <input type="password" name="registration_password" id="registration_password" placeholder="Password" class="txt_box"> <p id="reg_pwd_err" class="error"></p>  </div>   <div class="section">  <p class="tos">By clicking "Sign Up" you indicate that you have read and agree to the <a href="'+base_url+'/terms_conditions.php" target="_blank">Terms &amp; Conditions.</a></p></div><div class="section clearfix">  <input type="submit" onclick="javascript:user_registeration(1);" class="submit-button2" value="SIGNUP"></div></div><div class="ftr"><h4>Why do I need to sign in?</h4><p>This will help us serve you better and provide you a personalized experience.</p></div>'];
login_popup_screens['screen3']['links'] = ['<a class="login_link" onclick="javascript:switch_screen(\'screen1\')" href="#" >Login With Social Accounts</a><span>&bull;</span><a  class="login_link" onclick="javascript:switch_screen(\'screen2\')" href="#" >I Have '+SITE_NAME_TITLE+' Account</a>'];
//console.log(screens);

function switch_screen($calledscreen){
	$(".popup5").find(".popup-screens").html(Elegans.utils.removeScriptFromHtml(login_popup_screens[$calledscreen]['html'][0]));
	$(".popup5").find(".links_outside").html(Elegans.utils.removeScriptFromHtml(login_popup_screens[$calledscreen]['links'][0]));
}
function _custom_poplayer2(tit, wide, custom_function, add_class, head, close, remove_large, href, ftr_msg) {	
  $('.l2_outer_bx.transparent').remove();
	close = (typeof demosite != 'undefined' && demosite==1)?'N':close;
	//console.log('_custom_poplayer2');
	if(show_subscription_layer_timeout)clearTimeout(show_subscription_layer_timeout);	
	// custom_function is the function that can be passed as a param to this function to be excecuted after calling this layer. make sure that it is defined.
	if(!remove_large){
		remove_large = false;
	}
	if(!tit){
		tit='';
	}
	if(!head){
		head=2;
	}
	if(!href){
		href='';
	}
	var l2_id='';
	l2_id = parseInt($('.l2_outer_bx').length) + 1;
	var obj_id = "_l2_id_"+l2_id;

	var layer_op = "0.85";
	if(l2_id > 1){ 
		layer_op = "0";
	}

	var xtra_cls = ' ';
	if(add_class){
		xtra_cls += add_class;
	}

	 
	//type = '';
	if(head == 1){ 
		// var close_txt = '<a onclick="javascript: _remove_custom_poplayer2('+l2_id+');" class="close"><i class="fa fa-times"></i></a>';
		var close_txt = '<a onclick="javascript: _remove_custom_poplayer2('+l2_id+');" class="close" style="z-index:9999">x</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 
		
		//if(!ftr_msg) ftr_msg = 'This will help us serve you better and provide you a personalized experience.';
		
		var ttl_str = '';
		if(tit) ttl_str = '<h2 id="_l2_ttl_'+l2_id+'">'+tit+'</h2>';
		
		var append_str = '<div id="'+obj_id+'" class="popup5 l2_outer_bx '+xtra_cls+'" style="display:none;">'+ttl_str+'<div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div>';
		if(ftr_msg!='N' && login_popup_display_type==2){
		ftr_msg = 'This will help us serve you better and provide you a personalized experience.';
		append_str=append_str + '<div id="_l2_btm_'+l2_id+'" class="ftr"><h4>Why do I need to sign in?</h4><p>'+ftr_msg+'</p></div>';
		}
		append_str=append_str + close_txt+'</div>';
		//var append_str = '<div id="'+obj_id+'" class="popup5 V2 '+xtra_cls+'" style="display:none;">'+ttl_str+'<div class="popup-screens">'+ login_popup_screens['screen1']['html'][0] +'</div><div class="links_outside">'+ login_popup_screens['screen1']['links'][0] +'</div>'+close_txt+'</div>';
	}
	else if(head == 2){
		// if need close btn 
		var close_txt = '<a  style="z-index:9999" href="javascript:void(0);" class="close" onclick="javascript: _remove_custom_poplayer2('+l2_id+');">Close X</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 

		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 pop'+head+' '+xtra_cls+'" style="display:none;"><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div>'+close_txt+'</div>';
	} else if(head == 3){
		// if need close btn 
		var close_txt = '<a  style="z-index:9999" href="javascript:void(0);" class="close" onclick="javascript: _remove_custom_poplayer2('+l2_id+');"></a>'; //<span>Close</span>
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 
		
		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 pop'+head+' '+xtra_cls+'" style="display:none;">'+close_txt+'<h2 id="_l2_ttl_'+l2_id+'" class="thnkTx '+((tit)?'':'hide')+'">'+tit+'</h2><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div></div>';
	} else{
		// if need close btn 
		var close_txt = '<a  style="z-index:9999" href="javascript:void(0);" class="close" onclick="javascript: _remove_custom_poplayer2('+l2_id+');">X</a>';
		if(close == 'N' || gbl_lyr_close == 'N'){
			close_txt = '';
		} 

		var append_str = '<div id="'+obj_id+'" class="l2_outer_bx popup1 '+xtra_cls+'" style="display:none;"><div class="fb-blue-head">'+close_txt+'<h2 id="_l2_ttl_'+l2_id+'">'+tit+'</h2></div><div class="_l2_txt_cnt content clearfix" id="_l2_txt_cnt_'+l2_id+'"><span class="_l2_pre_load" id="_l2_pre_load_'+l2_id+'"><span class="loader">&nbsp;</span>Loading...</span></div><div id="_l2_btm_'+l2_id+'"></div></div>';
	}

	$("body").append(append_str);

	$("#"+obj_id).show().css({width:wide+'px'});
	if(add_class != 'transparent fadeInUp')
	{
	var lay = $("body").append("<div id='l2_overlay_bx_"+l2_id+"' class='overlay "+xtra_cls+"' style='z-index:9997;'></div>");
	$("#l2_overlay_bx_"+l2_id).css({opacity:layer_op});
	}
	else //minimized subscribe text for mobile
	{	
		$("#"+obj_id).prepend('<span class="slideup-btn" onclick="$(\'#'+obj_id+'\').addClass(\'slideup\')">Subscribe To Newsletter</span>');
	}
	try{ 
		if(href && custom_function) custom_function(href, l2_id);
		else if(custom_function) custom_function(l2_id);
	}catch(e){}
	
	if(head == 1){ 
		login_popup_display_type = 1;
	}
	if(add_class != 'transparent fadeInUp')
	{
		
		set_popup_position(l2_id);
       
		$( window ).resize(function() {
			
			try{
				set_popup_position(l2_id);
        		 
			} catch(e){}

			    

		});
	}
	if(profileComplete){
		//$('.l2_outer_bx').addClass("none_closable");
	}
	else{
      $('.l2_outer_bx').removeClass("none_closable");
    }
	return l2_id;
} 

function set_popup_position(lid){ 
	var obj_id = "_l2_id_"+lid;
	if($('#l2_wrapper_'+lid).length == 0)
	$("#"+obj_id).wrap( "<div class='l2_wrapper1' id='l2_wrapper_"+lid+"' style='position:fixed;left:0px;right:0px;top:0px;bottom:0px;z-index:9998'></div>" );
	
	if($.trim($('#_l2_ttl_'+lid).text()) == ''){
		$('#_l2_ttl_'+lid).css({'margin':'0'});
	} else{
		$('#_l2_ttl_'+lid).css({'margin':'0 auto 15px'});
	}
	divH = document.documentElement.clientHeight || document.body.clientHeight;
	divW = document.documentElement.clientWidth || document.body.clientWidth;
	
	layerH = $('#'+obj_id).outerHeight();
	layerW = $('#'+obj_id).outerWidth();
	
	var topPos = (divH-layerH)/2;
	var leftPos = (divW-layerW)/2;
	if(topPos < 0)
		topPos = 10;
	$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px",position:'relative'});
	if(divH < layerH){
		$("#"+obj_id).parent().css('overflow-y','auto');
	}
	return;
}

function set_popup_position_backup(lid){ 
	var obj_id = "_l2_id_"+lid;
	if($.trim($('#_l2_ttl_'+lid).text()) == ''){
		$('#_l2_ttl_'+lid).css({'margin':'0'});
	} else{
		$('#_l2_ttl_'+lid).css({'margin':'0 auto 15px'});
	}
	divH = document.documentElement.clientHeight || document.body.clientHeight;
	divW = document.documentElement.clientWidth || document.body.clientWidth;
	
	layerH = $('#'+obj_id).outerHeight();
	layerW = $('#'+obj_id).outerWidth();
	
	var topPos = (divH-layerH)/2;
	var leftPos = (divW-layerW)/2;
	if(divH < layerH+40){
		topPos = $(window).scrollTop() + 20;
		if(deviceType == 'desktop')
		$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px"});
		else
		$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px",position:"absolute"});
	}
	else
	$("#"+obj_id).css({top:topPos+"px",left:leftPos+"px"});
}


function _remove_custom_poplayer2(obj, skip_close_btn){ 
	if($('body').hasClass('modal-open')){
		$('body').removeClass('modal-open');
	}
	if(obj){
		var is_close = parseInt($('#_l2_id_'+obj+' a.close').length);
		// console.log(obj, skip_close_btn,is_close);
		if(is_close || skip_close_btn === true){
			var hideAll="#_l2_id_"+obj+",#l2_overlay_bx_"+obj+",#l2_wrapper_"+obj;
			if($("#_l2_id_"+obj).hasClass('fadeInUp'))
			{
				$("#_l2_id_"+obj).removeClass('fadeInUp').addClass('fadeInDown');
				/*setTimeout(function(){
					$(hideAll).remove();
				},1000);*/
				$(hideAll).remove();
			}
			else
			$(hideAll).remove();
			if(pAction == 'profile_completion'){
				var $skipprofilecompletion = getLocalStorage('skipprofilecompletion');
				if($skipprofilecompletion){
					if($skipprofilecompletion.value==null || $skipprofilecompletion.value==false){
						setLocalStorage('skipprofilecompletion',{'value':true,'count':1},1);
					}else if($skipprofilecompletion.value==true){
						if($skipprofilecompletion.count >= 3){
							setLocalStorage('skipprofilecompletion',{'value':true,'count':4},7);
						}else{
							setLocalStorage('skipprofilecompletion',{'value':true,'count':parseInt($skipprofilecompletion.count)+1},1);
						}
					}
				} else{
					setLocalStorage('skipprofilecompletion',{'value':true,'count':1},1);
				}
			}
			if(set_pop_cookie == 'Y'){ 
				setCookie(ET_PORTAL + '_pop_user_sub_close', set_cookie_email, ET_SUB_SOURCE_COOKIE);
			}
			// jng on 13-02-2014
			var is_source = $.trim($_GET['source']);
			if(fromMail_redirect_flag == 'Y' && is_source){
				window.location.href = Elegans.utils.encodeHTML(is_source);
			}
		}
	}	
}

function goToNews(src, obj){
	if(obj){
		var is_close = parseInt($('#_l2_id_'+obj+' a.close').length);
		if(is_close || skip_close_btn === true){
			var hideAll="#_l2_id_"+obj+",#l2_overlay_bx_"+obj;
			$(hideAll).remove();
			if(set_pop_cookie == 'Y'){ 
				setCookie(ET_PORTAL + '_pop_user_sub_close', set_cookie_email, ET_SUB_SOURCE_COOKIE);
			}
			
			var win = window.open(src, '_blank');
		}
	}
}

function show_subscription_layer2(lid){
	var profile_email = _profile_email;
	var emhtml = '<div class="subscribe-form"><form action="#" onsubmit="javascript:return save_techgig_updates_subsription(\'pop\', '+lid+'); return false;" method="post"><p class="clearfix"><input name="subscribe_email_pop" id="subscribe_email_pop" type="text" class="textbox" placeholder="Your email" value="'+profile_email+'"><input id="save_techgig_updates_subsription_btn" type="submit" class="submit" value="Subscribe"></p></form><p id="subcribe_response_pop" class="error"></p></div>';
	$('#_l2_txt_cnt_'+lid).html(Elegans.utils.removeScriptFromHtml(emhtml));
	Elegans.utils.removeClearJs();
	$('#subscribe_email_pop').focus();

}

function show_subscription_layer(lid){ 
	set_pop_cookie = 'Y';
	var profile_email = _profile_email;
	var is_show_pop = $.trim($_GET['show_pop']);
	var is_source = $.trim($_GET['source']);
	if (is_show_pop == 'Y' && is_source) {
		forward_blk = '<p class="more-lnk"><a target="_blank" href="' + is_source + '">Go to news &raquo;</a></p>';
	}
	var bottom_txt = '';
 
 
	var logoDiv = $(".logos").html();
	if(logoDiv != undefined && logoDiv!='')
	{
		var prtlSpnsrTxt = "Supported by:";
		if(ET_PORTAL == 'brandequity')prtlSpnsrTxt = "Associate Partner:";
		bottom_txt = '<div class="spnsrs"><h5><span>'+prtlSpnsrTxt+'</span></h5>'+logoDiv+'</div>';
	}else
	{
		bottom_txt = '';
	}
	
    // Pip Check
    if(is_pip) {
        SUBSCRIPTION_TAGLINES[ET_PORTAL] = pip.subscriptionTagline;
    }
    var nlid;
    if(typeof newsletterList != 'undefined' && Object.keys(newsletterList).length != 0) {
        $.each(newsletterList, function(key, value){
          nlid = value.id;
        });
    }
    var extra_skip_option='';
	
    // Get newsletter subcribing content as per single/multiple subscribe condition
    var newsletterHtmlContent = '';
    if (typeof allowMultipleNewsletterSubscription != 'undefined' && allowMultipleNewsletterSubscription == 1) {
        fieldPostfix = 'pop';
        newsletterHtmlContent = getMultiSubscribeNewsletterContent(profile_email, extra_skip_option, fieldPostfix, lid);
    } else {
        newsletterHtmlContent = '<form action="#" onsubmit="javascript:return save_techgig_updates_subsription(\'pop\', '+lid+'); return false;" method="post"><div style="max-width:380px;margin:0 auto;"><input name="subscribe_email_pop" id="subscribe_email_pop" type="text" class="txt_box fl" placeholder="Your email" value="'+profile_email+'" />&nbsp;&nbsp;<input type="hidden" name="newsletter_id_pop" id="newsletter_id_pop" value="'+nlid+'"><input id="save_techgig_updates_subsription_btn" type="submit" class="submit-button2" value="Subscribe" />'+extra_skip_option+'<p id="subcribe_response_pop" class="error"></p></div></form><div class="consent-popup"> <input type="checkbox" id="consentPopup_pop" name="consent Popup"> <label for="consentPopup_pop" style="text-align:left;"> I have read <a target="_blank" href="/privacy_policy.php">Privacy Policy</a> and <a target="_blank" href="/terms_conditions.php">Terms &amp; Conditions</a> and agree to receive newsletters and other communications on this email ID.</label></div><div id="subcribe_consentPopup_pop" class="subcribe_consentPopup et-rtl-error" style="display:block;"></div>';
    }
    
    if(!(typeof is_subscription_page != 'undefined' && is_subscription_page == 'Y'))
	extra_skip_option='<a onclick="javascript: _remove_custom_poplayer2('+lid+');" href="javascript:void(0);" class="skip" style="display:inline-block; line-height:32px; margin-left:10px; font-size:12px;">Skip this</a>';
	$('#_l2_txt_cnt_'+lid).html(Elegans.utils.removeScriptFromHtml('<div class="subscribe-form subscribeBx">'+((typeof demosite != 'undefined' && demosite == 1)?'<span class="cmngTx">Coming Soon!</span><img class="popLogo" src="'+($(".logo a").eq(0).css('background-image').replace(/"|\(|\)|url/g,''))+'" alt="">':'')+'<h2>Stay updated with the latest news in the '+SITE_CUSTOM_TITLES[ET_PORTAL]+' sector with our daily newsletter</h2><span class="subtitle">' + SUBSCRIPTION_TAGLINES[ET_PORTAL] + '</span>'+newsletterHtmlContent+'<br class="clear" />'+forward_blk+'</div>'+two_col_rt+bottom_txt));
	// $('#_l2_txt_cnt_'+lid +" img").css({'background-color':'#ffffff','margin':'0px','border':'none','padding':'2px','width':'auto'}).wrap('<div style="border:1px solid #c3c3c3;padding:3px;display:inline-block;margin-right:10px">','</div>');
	$('#subscribe_email_pop').focus();
	if(typeof auto_subscribe_submit != 'undefined' && auto_subscribe_submit == 1)
	$("#save_techgig_updates_subsription_btn").trigger('click');
	
	//$(window).scrollTop(0);
	if(bottom_txt != '')if(ET_PORTAL == 'brandequity')$("#_l2_txt_cnt_1 .spnsrs a").removeAttr("href");
}

 
function getMultiSubscribeNewsletterContent(profile_email, extra_skip_option, fieldPostfix, lid) 
{
    if (typeof profile_email == 'undefined' || profile_email === null) {
        profile_email = '';
    }
    
    if (typeof extra_skip_option == 'undefined' || extra_skip_option === null) {
        extra_skip_option = '';
    }
    
    if (typeof fieldPostFix == 'undefined' || fieldPostFix === null) {
        fieldPostFix = '';
    }
    
    if (typeof lid == 'undefined' || lid === null) {
        lid = 1;
    }

    var subscriptionNewsletterHtml = "";
    
    subscriptionNewsletterHtml += '<form id="subsfrm" style="" method="post" action="" onsubmit="return subscribeToMultipleNewsletters(\''+fieldPostfix+'\', '+lid+');">';
    subscriptionNewsletterHtml += '<div style="max-width:380px;margin:0 auto;">';
    subscriptionNewsletterHtml += '<input name="subscriber_email_'+fieldPostfix+'" id="subscriber_email_'+fieldPostfix+'" class="txt_box fl" placeholder="Your email" value="'+profile_email+'" />&nbsp;&nbsp;';
    subscriptionNewsletterHtml += '<input type="submit" id="saveSubscribeToMultipleNewsletters" class="submit-button2" value="Subscribe">'+extra_skip_option;
    subscriptionNewsletterHtml += '<p style="color:#FF0000;" id="subscription_error_message_'+fieldPostfix+'" class="error"></p>';

    var showNewsletterCheckbox = '';
    if(typeof newsletterList != 'undefined' && Object.keys(newsletterList).length == 1 ) {
        showNewsletterCheckbox = 'style="display:none;"';
    }

    subscriptionNewsletterHtml += '<ul class="nwsltr_lst clearfix" '+showNewsletterCheckbox+'>';
    if(typeof newsletterList != 'undefined' && Object.keys(newsletterList).length != 0) {
        $.each(newsletterList, function(key, value){
            // Make default newsletter checkedd
            var isChecked = "";
            if((value.newsletterName == 'Daily ET Newsletter') || 
                (is_pip == 1 && pip.newsletterId == value.id)) {
                    isChecked = "checked";
                }

            subscriptionNewsletterHtml += '<li>';
            subscriptionNewsletterHtml += '<label>';
            subscriptionNewsletterHtml += '<input type="checkbox" class="multiSubscribeNewsletter" name="newsletterId_'+fieldPostfix+'" value="'+value.id+'" '+isChecked+'>';
            subscriptionNewsletterHtml += '<h4>'+value.newsletterDisplayName+'</h4>';
            subscriptionNewsletterHtml += '</label>';
            subscriptionNewsletterHtml += '</li>';
        });
    }
    subscriptionNewsletterHtml += '</ul>';

    subscriptionNewsletterHtml += '</div>';
    subscriptionNewsletterHtml += '</form>';
    subscriptionNewsletterHtml += '<div class="consent-popup"> <input type="checkbox" id="consentPopup_pop" name="consent Popup"> <label for="consentPopup_pop" style="text-align:left;"> I have read <a target="_blank" href="/privacy_policy.php">Privacy Policy</a> and <a target="_blank" href="/terms_conditions.php">Terms &amp; Conditions</a> and agree to receive newsletters and other communications on this email ID.</label></div><div id="subcribe_consentPopup_pop" class="subcribe_consentPopup et-rtl-error" style="display:block;"></div>';
    
    return subscriptionNewsletterHtml;
}

 
//for event tracking

 
 
$.each($(".jsinvoker"), function(key, val){
	var fStr = $(val).data("jsinvoker_init");
	var jsStrFunc = new Function(fStr);
	jsStrFunc();
});

// doc on ready
$(document).keyup(function(e) {
	if (e.keyCode == 27) { 
		var _exists_len = parseInt($('.l2_outer_bx').length);
		if(_exists_len > 0 && !profileComplete){
			_remove_custom_poplayer2(_exists_len);
		}
	} 
});


 

 

// slike player implementation
var SPL = {
  config: {
    sdk: {
      apikey: slikeApi,
      referrer: encodeHTML(document.referrer)
    }
  }
};

(function(i, s, o, g, r, a, m) {
  a = s.createElement(o),
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', "//videoplayer.emsworld.com/v2.5.8/sdk.js");
function loadVideo() {
  var jsWebUrl = location.protocol + '//' + location.host;
  var player;
  
  var config = {
    page: {
      origin: jsWebUrl,
    },
    player: {
      skipAd: true,
      pageSection:  "default",
      adSection: "",
      autoPlayAudio:($slikeAudio)?false:'',
      autoPlay: ($slikeAudio)?true:slikePlay,      
      nextVideoCounter: 5000,
      startFromSec: 0,
      pauseOnHide: false,
      audioMode: ($slikeAudio)?true:false,   
      audioPrime: ($slikeAudio)?true:false,
      noLoader : ($slikeAudio)?true:false  
    },
    controls:{
      controlsType: "custom",
      showDimIcon: false,
      showFullScreen: ($slikeAudio)?false:true,
      showAutoPlayNext: true,
      showShare: true,
      volume: 70,
      mute: false,
      autoPlayNext: true,
      showNextButton: false,
      showPrevButton: false,
      showSpeedMenu: true,
      themeType: "white",
      themeColor:"white",
      forceWA:true,
      showFwdSeek:false,
      showBackSeek:false,
      lineCount:1,
      hideTopBar: true

    },
    video: {
      id: videoid,
      image: posterUrl,
      title: "",
      shareUrl: "",
    },    
    events: {
      onPlayerEvent: function(evtname, data) {        
        if(evtname == 'onAutoPlayButton'){
          console.log("play");
        }
      },
      onAdEvent: function(evtname, data) {
        //console.log(evtname);
      }
    }
  };
  $splConfig = config;
  loadPlayer();
}
function loadPlayer() {
    var retryInterval = 100;
    var playerFlag = true;
    if (typeof S != "undefined" && typeof S.load == "function") {
      S.load('playerContainer', $splConfig, function(inst) {
        console.log("Player load Completed");
        player = inst;  
        setTimeout(function(){
            domElmAdded();
        },1000);
      });
    } else {
      setTimeout(function () {
        loadPlayer();
      }, retryInterval);
    }
}

 
setTimeout(function(){
  $slikeAudio = $('#slikeAudioPlayer').length;  
  if($slikeAudio){}
  	loadVideo();
},1000);

function layerPop(id){
	var divW=$("body").width();

	$("#"+id).show();
	var divH   = document.documentElement.clientHeight || document.body.clientHeight;
	var layerH = document.getElementById(id).offsetHeight;
	var layerW = document.getElementById(id).offsetWidth;

	$("#"+id).css({top:(divH-layerH)/2+"px", left:(divW-layerW)/2+"px"});
}



 

function hide_layer_id(id){
	var is_source = $.trim($_GET['source']);
	if(fromMail_redirect_flag == 'Y' && is_source){
		loc = is_source;
	}
	
	$('#'+id).hide();
}

function change_news_widget(){
	var sel_val = $.trim($('#select_widget_code').val());
	
	$('#news_widgewt_code').html('<textarea onclick="$(this).select();" id="change_news_widget_code" name="change_news_widget_code" onblur="javascript:change_news_widget_user();"><iframe width="560" height="315" src="'+sel_val+'" frameborder="0"></iframe></textarea>');
	$('#news_widgewt_preview').html('<iframe width="560" height="315" src="'+sel_val+'" frameborder="0"></iframe>');
}

 
// jais on 28-03-2014 for FB SHARE
function show_social_reader_setup(){ 
	//alert(JSON.stringify(_oauth_data));return false;
	
	var ch_stat_n = '';
	var ch_stat_w = '';
	if(_oauth_data.share){ 
		if(_oauth_data.share.read_news == 1){
			ch_stat_n = 'checked="checked"';
		}
		if(_oauth_data.share.join_webinar == 1){
			ch_stat_w = 'checked="checked"';
		}
	}
	
	var ele_id = _custom_poplayer2(SITE_NAMES[ET_PORTAL]+' Social Share', '', '', '', 1);
	
	$('#_l2_txt_cnt_'+ele_id).html('<p>Help your contacts discover good content. Share what you read on ' + SITE_NAMES[ET_PORTAL] + ' automatically with your contacts on Facebook.  You can change the settings whenever you want.</p><div class="two-column"><div class="column fl clearfix"><label class="fb-turn-txt clearfix"><input id="ch_stat_read_news" onchange="javascript:save_item_share_status(this, \'read_news\');" type="checkbox" '+ch_stat_n+' />&nbsp;&nbsp;&nbsp;Turn on Social Reader</label></div><div class="column fr"><img src="'+base_url+'/Themes/Release/images/responsive/'+ET_PORTAL+'-fb-logo.jpg" width="230" /></div><div class="cl"></div></div>'); 
					
	//$('#_l2_btm_'+ele_id).html('<div class="fb-turnon-bar"><label class="fb-turn-txt"><input onchange="javascript:save_item_share_status(this, \'read_news\');" type="checkbox" '+ch_stat_n+' />&nbsp;&nbsp;&nbsp;Turn on Social Reader</label><div style="clear:both;"></div></div>');
	
	return ele_id;
}

 
function attach_on_off_share(){ 
	var button = this;
	var on_bx = $(button).closest(".status");
	var social_bx = $(button).closest(".scl-reader-icon");
	if($(on_bx).hasClass('on')){
		if($(social_bx).hasClass('fb')){ 
			save_social_share_status('fb_share_status', 2);
			_oauth_data.share.fb_share_status = 2;
			$('.scl-reader-icon.fb .status').removeClass('on');
			$('.scl-reader-icon.fb .status .txt').html('OFF');
			$('.scl-reader-icon.fb .status .button').html('ON');
		} else if($(social_bx).hasClass('linkedin')){
			save_social_share_status('in_share_status', 2);
			_oauth_data.share.in_share_status = 2;
			$('.scl-reader-icon.linkedin .status').removeClass('on');
			$('.scl-reader-icon.linkedin .status .txt').html('OFF');
			$('.scl-reader-icon.linkedin .status .button').html('ON');
		}
	} else {
		if($(social_bx).hasClass('fb')){ 
			save_social_share_status('fb_share_status', 1);
			_oauth_data.share.fb_share_status = 1;
			$('.scl-reader-icon.fb .status').addClass('on');
			$('.scl-reader-icon.fb .status .txt').html('ON');
			$('.scl-reader-icon.fb .status .button').html('OFF');
		} else if($(social_bx).hasClass('linkedin')){
			save_social_share_status('in_share_status', 1);
			_oauth_data.share.in_share_status = 1;
			$('.scl-reader-icon.linkedin .status').addClass('on');
			$('.scl-reader-icon.linkedin .status .txt').html('ON');
			$('.scl-reader-icon.linkedin .status .button').html('OFF');
		}
	}
}

function _fb_oauth_listener(data){ 
	_oauth_data = data;
	//console.log(data);
	
	var pop_status = 0;
	if(_oauth_data.share){
		pop_status = _oauth_data.share.popup_shown;
	}
	
	$('body').on('click', '.scl-reader-icon .button', attach_on_off_share);

	if(pop_status != 2){
		save_social_share_status('popup_shown', 2);
		setup_social_share_pop();
	}
	set_news_share_page_cnt();
}

function get_current_fb_oauth_status(listener_fn, post_data){
	if(login_uid){
		var _aurl = base_url+'/general_ajax_task.php?action=get_current_fb_oauth_status';
		$.ajax({
			type: "POST",
            dataType: "json",
            url: _aurl,
            data: {postData:JSON.stringify(post_data)},
            success: listener_fn
			});
	} else{
		return false;
	}
}

function save_item_share_status(obj, type){
	var stat = $(obj).is(':checked');
	var status = 1;
	if(stat == false){
		status = 2;
	}
	save_social_share_status(type, status);
}

function save_item_share_status_reverse(obj, type){
	var stat = $(obj).is(':checked');
	var status = 2;
	if(stat == false){
		status = 1;
	}
	save_social_share_status(type, status);
}

function save_fb_social_share_status(status){
	save_social_share_status('fb_share_status', status);
	if($('#fb_share_stat_link').length){
		var span_el = '<strong>Facebook Share Enabled</strong>';
		$('#fb_share_stat_link').html(span_el).css({'color':'#333'});
		return false;
	}
}

function save_social_share_status(type, status){ 
	if(login_uid && type && status){ 
		var _aurl = base_url+'/general_ajax_task.php?action=save_social_share_status';
		$.ajax({
			type: "POST",
            url: _aurl,
            data: {type:type, status:status},
            success: function(retn){ }
		});
	} 
}

function redirect_to_thankspage(email){
	if(reg_red_thanks == 'Y'){
		loc = base_url+'/subscribe/thanks?email='+email;
		return false;
	}
}

function set_redirect_cookie(url, show_layer){
	var cur_loc = loc;
	 
	if(show_layer === true){
		_custom_poplayer2('Connecting with Facebook', '', '', '', 1);
	}
	
	loc = url;
	return true;
}

function check_oauth_user(){
	$('.email-submit-form').removeClass('mand').find('em').remove();
	
	var _mail_id = $.trim($('#oauth_email').val());
	var err = false;
	if(_mail_id){
		if(is_valid_email(_mail_id)){
			return true;
		} else{
			err = true;
		}
	} else {
		err = true;
	}
	if(err == true){
		$('#oauth_email').parent('li').addClass('mand');
		$('<em>Invalid Email!</em>').insertAfter($('#oauth_email'));
	}
	return false;
	
}
	

function removeError(e){
	var id=$(e.target).attr('id');
	var value=$('#'+id).val();
	if(value){
	$('#'+id+'_err').html('').hide();
	$('#'+id+'_err').parent('div').removeClass('error');
	//validateEnrollmentData();
	}
}


 
function setup_social_share_pop(ele_id){ 	
	if(ele_id){	
		//console.log(_oauth_data);
		var _req_type = _oauth_data.type;
		
		var fb_oauth_stat = false;
		if(_oauth_data.fb_oauth){
			fb_oauth_stat = _oauth_data.fb_oauth.is_valid;
		} 
		
		var in_oauth_stat = false;
		if(_oauth_data.in_oauth){
			in_oauth_stat = _oauth_data.in_oauth.is_valid;
		} 
		
		var fb_share_status = 0;
		var in_share_status = 0;
		if(_oauth_data.share){
			fb_share_status = _oauth_data.share.fb_share_status;
			in_share_status = _oauth_data.share.in_share_status;
		} 
		
		if(fb_oauth_stat != true){
			var fb_in = '<a onclick="javascript:set_redirect_cookie(\''+loginUrl_facebook+'\'); return false;" class="fb-enable social-reader-btn" href="'+loginUrl_facebook+'">Connect</a>';
		} else {
			if(fb_share_status != 1){
				var fb_in = '<span class="scl-reader-icon fb"><span class="status"><span class="txt">OFF</span><span class="button">ON</span></span></span>';
			} else{
				var fb_in = '<span class="scl-reader-icon fb"><span class="status on"><span class="txt">ON</span><span class="button">OFF</span></span></span>';
			}
		}
		
		var fb_blk = '<div class="social-button clearfix"><span class="title">Share on Facebook</span>'+fb_in+'</div>';
		
		if(in_oauth_stat != true){
			var in_in = '<a onclick="javascript:set_redirect_cookie(\''+loginUrl_linkedin+'\'); return false;" class="linkedin-enable social-reader-btn" href="'+loginUrl_linkedin+'">Connect</a>';
		} else{
			if(in_share_status != 1){
				var in_in = '<span class="scl-reader-icon linkedin"><span class="status"><span class="txt">OFF</span><span class="button">ON</span></span></span>';
			} else{
				var in_in = '<span class="scl-reader-icon linkedin"><span class="status on"><span class="txt">ON</span><span class="button">OFF</span></span></span>';
			}
		}
		
		var in_blk = '<div class="social-button clearfix"><span class="title">Share on LinkedIn</span>'+in_in+'</div>';
		
		 
		 
		
	} else{
		 
		setup_social_share_pop(ele_id);
	}
}

function show_relvideo(msid, user_fn){
	if(msid){  
		$('.icon_player').addClass('rotate_blk');
		if(_relvideo){
			if(_relvideo.msid == msid){
				user_fn(_relvideo);
				return;
			} 
		}
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url: base_url+"/general_ajax_task.php?action=get_cms_video_detail",
			data: {'msid' : msid},
			success: function(data){
				if(data){
					_relvideo = data;
					user_fn(data);
				}
			}
		});
		
	}
}

 

function hide_show_ids(hideblk,showblk){
	$('.icon_player').removeClass('rotate_blk');
	if(hideblk && showblk){
		$(hideblk).hide();
		$(showblk).show();
	}
}

function show_video_page(pos){  
	if(is_vslide_on == true){ return; }
	is_vslide_on = true;
	video_next = parseInt(video_next);
	video_prev = parseInt(video_prev);
	//console.log(video_prev+'/'+video_next);
	var page = 0;
	if(pos == 'next'){ 
		page = video_next;
		$('#'+video_control+' a.next').removeClass('inactive').addClass('active');
		$('#'+video_control_2+' a.next').removeClass('inactive').addClass('active');
		$('#'+video_control+' a.previous').removeClass('inactive').addClass('active');
		$('#'+video_control_2+' a.previous').removeClass('inactive').addClass('active');
		if(video_next+1 > video_last){ 
			//console.log('next:'+video_prev+'/'+video_next);
			$('#'+video_control+' a.next').removeClass('active').addClass('inactive');
			$('#'+video_control_2+' a.next').removeClass('active').addClass('inactive');
		}
		if(page > video_last){
			is_vslide_on = false;
			return false;
		}
		video_next += 1;
		video_prev += 1;
	} else if(pos == 'prev'){ 
		page = video_prev;
		$('#'+video_control+' a.next').removeClass('inactive').addClass('active');
		$('#'+video_control_2+' a.next').removeClass('inactive').addClass('active');
		$('#'+video_control+' a.previous').removeClass('inactive').addClass('active');
		$('#'+video_control_2+' a.previous').removeClass('inactive').addClass('active');
		if(video_prev-1 < 1){ 
			//console.log('next:'+video_prev+'/'+video_next);
			$('#'+video_control+' a.previous').removeClass('active').addClass('inactive');
			$('#'+video_control_2+' a.previous').removeClass('active').addClass('inactive');
		}
		if(page < 1){
			is_vslide_on = false;
			return false;
		}
		video_next -= 1;
		video_prev -= 1;
	} 
	
	show_loading_overlay($('#'+video_blockid).parent('.page_overlay_outer'));
	
	$.ajax({
		type: "POST",
		dataType: "json",
		url: base_url+"/general_ajax_task.php?action=get_cms_video_pagination",
		data: {'page':page,'video_path':video_path},
		success: function(data){
			set_video_pagination_ui(data);
			initUnveilImg();
		}
	});
	//console.log(page);
}

function set_video_pagination_ui(data){ 
	if(data){ 
		var echo = '';
		var image_src = '';
		if(data.videos){ 
			hide_loading_overlay($('#'+video_blockid).parent('.page_overlay_outer'));
			$.each(data.videos, function (index, item) {
				 
				if(item.thbmedia == 1){
					//image_src = CMS_IMG_URL+'/thumb/'+item.msid+'.cms?width=145&height=110';
					image_src = CMS_IMG_URL+'/thumb/'+item.msid+'.cms?width=225&height=143';
				}
				 
				 
			});
		}
		if(echo){
			$('#'+video_blockid).html(echo).hide().fadeIn();
		}
	} 
	is_vslide_on = false;
}

 
 

function set_slideshow_pagination_ui(data){ 
	if(data){ 
		var echo = '';
		var image_src = '';
		if(data.slideshows){ 
			hide_loading_overlay($('#'+slide_blockid).parent('.page_overlay_outer'));
			$.each(data.slideshows, function (index, item) {
				 
				if(item.thumbid){
					image_src = CMS_IMG_URL+'/thumb/'+item.thumbid+'.cms?width=145&height=110';
				}
				var slideshow_url = base_url+"/slide-shows/"+item.secmsnameseo+'/'+item.thumbid; //+'/'+item.msnameseo
				echo += '<li><a href="'+slideshow_url+'"><div class="image"><img src="'+image_src+'" alt="" /><span class="slide-icon">&nbsp;</span></div><span class="caption">'+item.secname+'</span></a></li>';
			});
		}
		if(echo){
			$('#'+slide_blockid).html(echo).hide().fadeIn();
		}
	} 
	is_sslide_on = false;
}

function show_loading_overlay(boxid){
	if(boxid){
		$(boxid).prepend('<div class="overlay-bg"><span class="loader"></span></div>');
	}
}

function hide_loading_overlay(boxid){
	if(boxid){
		$(boxid).find('.overlay-bg').remove();
	}
}
var pAction = null;
var newsletter_activity=null;
 

function is_valid_url(url){ 
	if(/^([a-z]([a-z]|\d|\+|-|\.)*):(\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?((\[(|(v[\da-f]{1,}\.(([a-z]|\d|-|\.|_|~)|[!\$&'\(\)\*\+,;=]|:)+))\])|((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=])*)(:\d*)?)(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*|(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)|((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)){0})(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(url)) {
		return true;
	} else {
		return false;
	}
}

function check_sub_popup_show(){ 
	if(isGDPRNation()) //prevent login check
	return false;
	 
	show_subscription_layer_timeout = setTimeout(function() { 
		 
		exec_check_sub_popup_show();
	}, 5000);  
}

function exec_check_sub_popup_show(){
 
	if(!xCookie && !xCookieClose && !login_required && !_is_loggedin){ 
		setTimeout(function(){
			if (B2B_SSO_LOGIN == 1){
				return false;
			}
 		},10000);
	}
}

function overRideHistoryState(url,title){ 
	var fullurl = loc.href;
	try{
		if(!url) url = loc;
		if(!title) title = $(document).find("title").text();
		var State = History.getState();
	 
		History.replaceState({}, title, fullurl);
	} catch(e){  }
}

 
function auto_search_pop(id){ 
	var e = $('#'+id);
	var ev = e.val().replace(/ +(?= )/g,'');
	var tev = $.trim(ev);
	var evl = ev.length;
	
	e.val(ev);
	if(evl >= 3 && tev != last_search_val){
		$('ul#nav_search_list').html('').hide();
		last_search_val=tev;
		
		for(var i = 0; i < search_requests.length; i++)
		search_requests[i].abort();
		// XSLT
		 
		  
		
		$.getScript(_aurl);
	}
	return false;
}

function cb_search(data) {
	var html='';
	if(data.sec && data.sec.stry){
		$.each(data.sec.stry, function(){
			if(this.stname && this.seolocation){
				this.stname = this.stname.replace(new RegExp(last_search_val, 'ig'),'<strong style="color:blue;">'+last_search_val+'</strong>');
				 
			}					
		});
	}
	$('ul#nav_search_list').html(html).show();
}

function showhide_blk(show_blk, hide_blk){
	if($(show_blk).length){
		$(show_blk).show();
	}
	if($(hide_blk).length){
		$(hide_blk).hide();
	}
}
/*
* creates social share links for anchor tag href and onclick
*/
function getSocialShareUrl($socialKey, $info)
{
	var $url = encodeURIComponent($info['url']);
	var $title = $info['title'];
	var $title_euc = rfc3986EncodeURIComponent($title);
	var $image_url = $info['imgUrl'];
	var $description = $info['desc'];
	var $href = '';
	var $clickUrl = '';
	var $linkObj = {};
	switch($socialKey)
	{
		case 'tw':
			$href = 'http://twitter.com/share?text='+$title+'&url='+$url+'&title='+$title;
			$clickUrl = 'http://twitter.com/home/?status='+$title_euc+' '+$url;
			break;
		case 'fb':
			$href = 'http://www.facebook.com/sharer.php?u='+$url+'&title='+$title;
			$clickUrl = 'http://www.facebook.com/sharer.php?s=100&p[title]='+$title_euc+'&p[summary]='+$description+'&p[url]='+$url+'&p[images][0]='+$image_url;
			break;
		case 'lnkd':
			$href = 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title+'&source='+base_url;
			$clickUrl = 'http://www.linkedin.com/shareArticle?mini=true&url='+$url+'&title='+$title_euc+'&summary='+$description+'&source='+base_url;
			break;
		case 'gp':
			$href = 'https://plus.google.com/share?url='+$url+'&title='+$title_euc;
			$clickUrl = $href;
			break;
		case 'whatsapp':
			$href = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$url;
			$clickUrl = $href;
			break;
	}
	$linkObj['href'] = $href;
	$linkObj['onclick'] = 'window.open(\''+$clickUrl+'\', '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;';
	return $linkObj;
}
/*
* encodeURIComponent fix for quotes
*/
function rfc3986EncodeURIComponent (str) {  
	return encodeURIComponent(str).replace(/[!'()*]/g, escape);  
}

 
 

function floatimgmargin()
	{
	
	$('.text img').alignByFloat('left').css({margin:'0 20px 10px 0'});
	$('.text img').alignByFloat('right').css({margin:'0 0 10px 20px'});
	}
	$.fn.alignByFloat= function(val) {
		var $images = $(".text img").filter(function() {
			return $(this).css('float') == val;
	  });
	  return $images;	
	};

 
function getTimeUnitMax(timeInSec, format)
{
	var yr = Math.floor(timeInSec / (86400*365));
	var dy = Math.floor(timeInSec / 86400);
	var hr = Math.floor(timeInSec / 3600);
	var mn = Math.floor(timeInSec % 3600 / 60);
	var sec = Math.round(timeInSec % 3600 % 60);
	if (sec == 60)
	{
		mn = mn + 1;
		sec = 0;
	}
	if(yr>0)return yr+((format=='short')?'y':((yr==1)?' year':' years'));
	if(dy>0)return dy+((format=='short')?'d':((dy==1)?' day':' days'));
	if(hr>0)return hr+((format=='short')?'h':((hr==1)?' hr':' hrs'));
	if(mn>0)return mn+((format=='short')?'m':((mn==1)?' min':' mins'));
	if(sec>0)return sec+((format=='short')?'s':((sec==1)?' sec':' secs'));
}
function refreshTimeElapsed()
{
	var curTmStmp = parseInt($.now()/1000);
	$(".time-elapsed").each(function(){
		var tmPub = Number($(this).attr('data-time-published'));
		if(Boolean(tmPub))
		{
			var tmElps = curTmStmp - tmPub;
			$(this).html(getTimeUnitMax(tmElps) + ' ago');
		}
	});
}
function close_empty_featured_sections(){
	$(".featured_section").each(function(){
		$temp = $(this);
		if(!$.trim($temp.html()) && !$temp.hasClass('hide')){
			$temp.parent(".widget").addClass('hide');
			$temp.parent(".wdgt").addClass('hide');
		}
	});
}
function social_bar($id,$news,$display_type){
	if($display_type == 1)
	{
		$master_disqus_link = $news['canonicalUrl'];
		$socialShareBarOld = '<div class="flL default_styl"><div class="fb-share-button" data-href="'+$master_disqus_link+'" data-type="button_count"></div>&nbsp;<div class="g-plus" data-action="share" data-annotation="bubble" data-href="'+$master_disqus_link+'"></div>&nbsp;<script type="IN/Share" data-summary="'+$news['title']+'" data-url="'+$master_disqus_link+'" data-counter="right"></script>&nbsp;<a href="https://twitter.com/share" class="twitter-share-button" data-lang="en" data-url="'+$master_disqus_link+'" data-counturl="'+$master_disqus_link+'"  style="height:20px;display:inline-block" ></a></div>';
		return $socialShareBarOld;
	}
	else if($display_type == 2)
	{
		$text_0_UE = $('<div/>').html($news['title']).text();
		$text_1_UE = $('<div/>').html($news['page_description']).text();
		$link_0_UE = encodeURI($news['canonicalUrl']);
		$imgPath_0_UE = encodeURI($news['seo_image']);
		
		$master_disqus_link = {};
		$master_disqus_link['twitter'] = 'http://twitter.com/share?text='+$text_0_UE+'&url='+$link_0_UE+'&title='+$text_0_UE;
		$master_disqus_link['facebook'] = 'http://www.facebook.com/sharer.php?u='+$link_0_UE;
		$master_disqus_link['linkedin'] = 'http://www.linkedin.com/shareArticle?mini=true&url='+$link_0_UE+'&title='+$text_0_UE+'&source='+base_url ;
		$master_disqus_link['gplus'] = 'https://plus.google.com/share?url='+$link_0_UE;
		//$master_disqus_link['whatsapp'] = 'whatsapp://send?text='+$text_0_UE+'%20'+$link_0_UE;
		$master_disqus_link['whatsapp'] = ((deviceType != 'mobile')?'https://wa.me/':'whatsapp://send')+'?text='+$link_0_UE;
		$master_disqus_link['email'] = $news['canonicalUrl'];
		 
		
		$socialShareBarnew ='<div class="flL custom_styl"><div class="socialShareBar socialShareBar1" data-unique_key="socialShareBar1" >'+
						'<div class="socialShareElement facebook" data-social_key="facebook" id="fb_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['facebook']+'" onclick="window.open(this.href, \'sharer\', \'toolbar=0,status=0,width=548,height=325\'); return false;" class="btn"><i class="fa fa-facebook"></i><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>&nbsp;'+
						'<div class="socialShareElement twitter" data-social_key="twitter" id="tw_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['twitter']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><i class="fa fa-twitter"></i><span class="label">Tweet</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement linkedin" data-social_key="linkedin" id="ln_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['linkedin']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><i class="fa fa-linkedin"></i><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement gplus" data-social_key="gplus" id="gp_sh_but">'+
						'<a target="_blank" href="'+$master_disqus_link['gplus']+'" onclick="window.open(this.href, '+'\'sharer\''+', '+'\'toolbar=0,status=0,width=548,height=325\''+'); return false;" class="btn"><i class="fa fa-google-plus"></i><span class="label">Share</span></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement whatsapp" data-social_key="whatsapp" id="wa_sh_but">'+
						'<a target="_top" href="'+$master_disqus_link['whatsapp']+'" data-text="'+$text_0_UE+'" data-href="'+$link_0_UE+'"><i class="fa fa-whatsapp"></i></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'<div class="socialShareElement email addthis_toolbox" style="display:none" data-social_key="email" id="em_sh_but">'+
						'<a target="_blank" addthis:url="'+$master_disqus_link['email']+'" addthis:title="'+$text_0_UE+'" href="http://www.addthis.com/bookmark.php" title="Email" class="addthis_button_email"><i class="fa fa-envelope-o"></i></a><div class="count"><span class="triangle-left"></span><span class="num">&nbsp;</span></div></div>'+
						'</div></div>';
		
		return $socialShareBarnew;
		
	}
	
}
function add_social_bar_dynamic(id,data,display_type,type){
	if(type == 'both')
	{
		social_bar_html = social_bar(id,data,2);
		social_bar_html += social_bar(id,data,1);
		
	}
	else
	social_bar_html = social_bar(id,data,display_type);
	$(id).html(social_bar_html);
	try{
		FB.XFBML.parse();
		twttr.widgets.load();
		gapi.plus.go();
		IN.parse();
		addthis.toolbox('.addthis_toolbox');
		/*
		var i;
		for(i=0; i<20; i++)
		{
			$("#___plus_"+i).css({width:'80px'});
			$("#___plus_"+i+" iframe").css({width:'80px'});
		}
		$(".main-content .g-plus").hide();
		*/
	}
	catch(e){
		//
	}
}


 
 function reloadPage(){
	 location.reload(true);
 }


function isUserAgentMobile()
{
	var isMobile = false;
	if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)|| /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) isMobile = true;
	return isMobile;
}
function showHideWhatsapp()
{
	return;
	if(deviceType != 'desktop')
	{
		$(".socialShareBar .socialShareElement.whatsapp, .story-box .social a.whatsapp, .portfolio .section .social a.whatsapp, .social.sidepanel a.whatsapp, slideshow_sharepanel.slideshow_sharepanel-Bottom .social-share.circle a.whatsapp, .slideshow_sharepanel .social-share.circle a.whatsapp, .socialShareBar2 ul li a.whatsapp, .pictr_stry .social-share a.whatsapp").css({display:'inline-block'});
		$(".socialShareBar2 ul li a.print-btn").css({display:'none'});
	}else
	{
		$(".socialShareBar .socialShareElement.whatsapp, .story-box .social a.whatsapp, .portfolio .section .social a.whatsapp, .social.sidepanel a.whatsapp, slideshow_sharepanel.slideshow_sharepanel-Bottom .social-share.circle a.whatsapp, .slideshow_sharepanel .social-share.circle a.whatsapp, .socialShareBar2 ul li a.whatsapp, .pictr_stry .social-share a.whatsapp").css({display:'none'});
		$(".socialShareBar2 ul li a.print-btn").css({display:'inline-block'});
	}
}

function ping_check_login_status(){ 
	if(login_required){ //&& !_is_loggedin    
		check_login_status();
	}
}

function default_cb_on_login(){ 
	_is_loggedin=1; //console.log('_is_loggedin=1');
	if($('body').find('._lgn_pop').length >= 1) _remove_custom_poplayer2(1, true);
	
	$('#top-login-btn').hide();
	//setting callback fn.
	if(_gbl_logincb_fn){
		_gbl_logincb_fn();
	}
	else
    {
      if(typeof window.social_login != 'undefined' && window.social_login == 1)
      setup_profile_complete_box(_loggedin_user,'profile_completion');
    }
    if(typeof window._gbl_logincb_fn_event_sent == 'undefined'){
    	$(document).trigger($.Event('_gbl_logincb_fn_event'));	
    	window._gbl_logincb_fn_event_sent = 1;
    }
    
}

function default_cb_on_nonlogin(showbx){ 
	_is_loggedin = 0; //console.log('_is_loggedin=0');
	console.log('showbx',showbx);
	if(showbx == true){
		if($('body').find('._lgn_pop').length <= 0){
			if(typeof forum_page_log_pop == "undefined"){
			_custom_poplayer2('','',show_login_layer,'_lgn_pop', 1,(login_required)?'N':'Y');
			}
			else if(typeof forum_page_log_pop!= "undefined" && forum_page_log_pop==1 && typeof sso_login_channel!= "undefined" && sso_login_channel!=''){
				if(forum_header==''){
					forum_header='<div class="hdr_l1">Thank you for stopping by!</div><div class="hdr_l2">Please login  to continue your journey on '+SITE_TITLE+' Ask!</div>';
				}
				show_login_layer_sso(forum_header,forum_footer,'');
			}
			else{
				if(forum_header==''){
					forum_header='<div class="hdr_l1">Thank you for stopping by!</div><div class="hdr_l2">Please login  to continue your journey on '+SITE_TITLE+' Ask!</div>';
				}
				show_login_layer_custom(forum_header,forum_footer,'');
			}
		
		}
	}
	else if(!(_gbl_notlogincb_fn))
	{
		if(typeof Promise !== "undefined" && navigator.userAgent.toLowerCase().match('crios')||navigator.userAgent.toLowerCase().match('chrome')
        )
		{
			(function() {
				var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
				po.src = THEME_PATH+'/javascript/onetap_signin_js.js?mod=50';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
			})();
		}
	}
	 
	$('#logged_username').hide(); 
	$('#top-login-btn').show();
	//setting callback fn.
	if(_gbl_notlogincb_fn){
		_gbl_notlogincb_fn();
	}
	$(document).trigger($.Event('_gbl_notlogincb_fn_event'));
}

function nFormatter(num) {
    if (num >= 1000000000) {
       return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
    if (num >= 1000000) {
       return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1000) {
       return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
    return num;
}

function number_formatter(num) {
	
	if(num){
		num=num.toString();
	    x = num.split('.'); 
	    x1 = x[0]; x2 = x.length > 1 ? '.' + x[1] : ''; 
	    var rgx = /(\d+)(\d{3})/; 
	    while (rgx.test(x1)) { 
	        x1 = x1.replace(rgx, '$1' + ',' + '$2'); 
	    } 
	    return (x1 + x2); 
	}
	else if(num==0){
		return num;
	}
}
 

function connect_fb(shr_type){
	var facebook_reg_url = 'https://www.facebook.com/v2.7/dialog/oauth?client_id='+FACEBOOK_APPID+'&display=popup&redirect_uri='+base_url+'/ajax_files/Elagan.php%3Ftype%3Dfb_connect_only%26connect_type%3D'+shr_type+'&scope=email%2C+user_education_history%2C+user_hometown%2C+user_location%2C+user_work_history%2C+publish_actions'; 
	 var win         =   window.open(facebook_reg_url, "windowname1", 'width=600, height=400'); 
}

 
 
 
/*============================================= for ElaganRHSBlogAuthors ==========================================================*/
 
function getSocialShareWidget($obj)
{
	//console.log('getSocialShareWidget');
	var text_0 = $obj['text_0'];
	var text_1 = $obj['text_1'];
	var link_0 = $obj['link_0'];
	var imgPath_0 = $obj['imgPath_0'];
	 
	return socialElem;
}

function string_in_url(str){
	if(location.href.indexOf(str) > -1) 
	{
		return 1;
	}	
	else{
		return 0;
	}
}

function toCamelCase(str) {
    return str.replace(/(?:^|\s)\w/g, function(match) {
        return match.toUpperCase();
    });
}
(function($) {
    $.fn.changeElementType = function(newType) {
        var attrs = {};

        $.each(this[0].attributes, function(idx, attr) {
            attrs[attr.nodeName] = attr.nodeValue;
        });

        this.replaceWith(function() {
            return $("<" + newType + "/>", attrs).append($(this).contents());
        });
    }
})(jQuery);
function render_iframe_from_div(){
	$(".diviframe:not(.iframerendered)").each(function(){
		$(this).changeElementType('iframe');
		$(this).addClass('.iframerendered');
	}); 
}

 
function getBrowserInfo(){

	var nVer = navigator.appVersion;
	var nAgt = navigator.userAgent;
	var browserName  = navigator.appName;
	var fullVersion  = ''+parseFloat(navigator.appVersion); 
	var majorVersion = parseInt(navigator.appVersion,10);
	var nameOffset,verOffset,ix;

	// In Opera, the true version is after "Opera" or after "Version"
	//if ((verOffset=nAgt.indexOf("Opera"))!=-1) {
	if((verOffset=nAgt.indexOf("Opera"))!=-1 || (verOffset=nAgt.indexOf("OPR"))!=-1){
		browserName = "Opera";
		fullVersion = nAgt.substring(verOffset+6);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}
	// In MSIE, the true version is after "MSIE" in userAgent
	else if ((verOffset=nAgt.indexOf("MSIE"))!=-1) {
		browserName = "Microsoft Internet Explorer";
		fullVersion = nAgt.substring(verOffset+5);
	}
	// In Chrome, the true version is after "Chrome" 
	else if ((verOffset=nAgt.indexOf("Chrome"))!=-1) {
		browserName = "Chrome";
		fullVersion = nAgt.substring(verOffset+7);
	}
	// In Safari, the true version is after "Safari" or after "Version" 
	else if ((verOffset=nAgt.indexOf("Safari"))!=-1) {
		browserName = "Safari";
		fullVersion = nAgt.substring(verOffset+7);
		if ((verOffset=nAgt.indexOf("Version"))!=-1) 
			fullVersion = nAgt.substring(verOffset+8);
	}
	// In Firefox, the true version is after "Firefox" 
	else if ((verOffset=nAgt.indexOf("Firefox"))!=-1) {
		browserName = "Firefox";
		fullVersion = nAgt.substring(verOffset+8);
	}
	// In most other browsers, "name/version" is at the end of userAgent 
	else if ( (nameOffset=nAgt.lastIndexOf(' ')+1) < 
			  (verOffset=nAgt.lastIndexOf('/')) ) 
	{
		browserName = nAgt.substring(nameOffset,verOffset);
		fullVersion = nAgt.substring(verOffset+1);
		if (browserName.toLowerCase()==browserName.toUpperCase()) {
			browserName = navigator.appName;
		}
	}
	// trim the fullVersion string at semicolon/space if present
	if ((ix=fullVersion.indexOf(";"))!=-1)
	   fullVersion=fullVersion.substring(0,ix);
	if ((ix=fullVersion.indexOf(" "))!=-1)
	   fullVersion=fullVersion.substring(0,ix);

	majorVersion = parseInt(''+fullVersion,10);
	if (isNaN(majorVersion)) {
		fullVersion  = ''+parseFloat(navigator.appVersion); 
		majorVersion = parseInt(navigator.appVersion,10);
	}

	return {name: browserName, version: majorVersion};	 
}
/*=============================================================================================================================*/

 
 
var getfeaturedSectionId = getLocalStorage("featuredSectionId");
var expireLocalTime = 5/(24*60);
var storeSectionInfo = [];
 

function addDynamicCss(css){
    head = document.head || document.getElementsByTagName('head')[0],
        style = document.createElement('style');
    style.type = 'text/css';
    if (style.styleSheet){
      style.styleSheet.cssText = css;
    } else {
      style.appendChild(document.createTextNode(css));
    }
    head.appendChild(style);   
}

 
 

window.onload = function() {
    setTimeout(function(){
      //render_featured_sections();
      (function() { 
        var gads = document.createElement('script'); 
        gads.async = true; 
        gads.defer = true; 
        gads.type = 'text/javascript'; 
        var useSSL = 'https:' == document.location.protocol; 
        gads.src = (useSSL ? 'https:' : 'http:') +  '//www.googletagservices.com/tag/js/gpt.js'; 
        var node = document.getElementsByTagName('script')[0]; 
        node.parentNode.insertBefore(gads, node); 
      })();  
    },100);
};




Elagans.infiniteScroll = (function(){  
  var loadNextPage = function(){
    if((typeof window['loadingNextPage']=='undefined' || window['loadingNextPage'] == 0) &&  !($("link[rel=next]").length < 1 || $("link[rel=next]").attr('href').length < 1))
    {
      window['loadingNextPage'] = 1;      
      $.ajax({
         url: $("link[rel=next]").attr('href'),
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Requested-With', 'false');},
         success: function(data) { window['loadingNextPage'] = 0;
            data = data.replace('<!DOCTYPE html>','');
            data = data.replace("\n",'');
            data = $.parseHTML('<xxx>'+data+'</xxx>');
            $listingselector = "#content .news-listing-infinite";
            $newdata = $(data).find($listingselector).html();
            if($newdata && $newdata.length > 0)
            {
              $($listingselector).append($newdata);
              //$('window').trigger('scroll');
              $("link[rel=next]").attr('href',$(data).find("link[rel=next]").attr('href'));
              $("link[rel=prev]").attr('href',$("link[rel=prev]").attr('href'));
              contentAdded($($listingselector));
            }
            else
            {
              $(".load-more-btn").remove();
            }
          }
      });
    }
  };
  var loadPage = function($url,$appendSelector,$appendToSelector,$callback){
      if($url.startsWith('/'))
      $url = root_url+$url;
      if(!Elagans.utils.isUrl($url))
      {
        return;
      }
      if(!$url.startsWith(root_url))
      {
        loc.assign($url);
        return;
      }
      loadScript(JS_PATH+'/../v2/js/nprogress.js',function(){
        loadCss(THEME_PATH+'/v2/css/nprogress.css');
        NProgress.start();
      });
      if(typeof $appendToSelector == 'undefined')
      {
        $appendToSelector = '#content';
      }
      if(typeof $appendSelector == 'undefined')
      {
        $appendSelector = '#content';
      }
      $.ajax({
         url: $url,
         type: "GET",
         beforeSend: function(xhr){xhr.setRequestHeader('X-Requested-With', 'false');},
         success: function(data) {
            data = data.replace('<!DOCTYPE html>','');
            data = data.replace("\n",'');
            data = data.replace(/(<\/?)body( .+?)?>/gi,'$1bodyv2$2>',data);
            data = $.parseHTML('<xxx>'+data+'</xxx>',document,true);
            $listingselector = "#content";
            window.data = data = $(data);
            $newdata = data.find($appendSelector).html();
            if($newdata && $newdata.length > 0)
            {
              data.find('link[rel="stylesheet"][type="text/css"]').each(function(){
                $this = $(this);
                if($(document).find('link[rel="stylesheet"][type="text/css"][href="'+$this.attr('href')+'"]').length == 0)
                loadCss($this.attr('href'));
              })
              data.find('script[src]:not(:eq(0))').each(function(){
                loadScript($(this).attr('src'));
              });
              data.find('script.externalScript').each(function(){
                Function($(this).html());
              });
              $($appendToSelector).html($newdata);
              if($appendSelector == '#content')
              {
                Elagan.comJs.scrollTo('body'); 
                try{
                  $('body').attr('class',$('body').attr('class').replace('page-','lastpg-'));
                  $.each(data.find('bodyv2').attr('class').split(' '),function(i,v){
                    $('body').addClass(v);
                  })
                }
                catch(err){
                  console.log(err);
                }
                $("link[rel=b2b_canonical]").attr('href',data.find("link[rel=b2b_canonical]").attr('href'));
                if(data.find("link[rel=next]").length > 0)
                {
                  if($("link[rel=next]").length == 0)
                  $("head").append('<link rel=next />');
                  $("link[rel=next]").attr('href',data.find("link[rel=next]").attr('href'));
                }
                else
                $("link[rel=next]").remove(); 
                changebrowserurl($("link[rel=b2b_canonical]").attr('href'),data.find('title').text(),1);
              }            
              contentAdded($($appendToSelector));
              if(typeof $callback == 'function')
              $callback(data);
              if(typeof NProgress != 'undefined')
              NProgress.done();
            }
            else{
              window.hoverFlag = 1;
              $('#nprogress').hide();
              $('.model-box, .model-bg').remove();
            }
          }
      });
  };
  var addScrollFunction  = function($obj){
	  if(typeof $obj == 'undefined')
	  return;
	  loadScript(JS_PATH+'/../v2/js/isInViewport.js',function($obj){
	    $(window).on('scroll',$obj,function() {
	      try{
	        if($obj.find("#content .load-more-btn").length == 1)
	        {
	          $('.load-more-btn:in-viewport').each(function(){
	            Elagan.infiniteScroll.loadNextPage();
	          });
	        }

	      }
	      catch(e){}
	    });
	    if($obj.get(0)?.tagName != 'BODY')
	    {
	      $obj.on('scroll',function(){
	        $(window).trigger('scroll');  
	      });
	    }
	    $(window).trigger('scroll');
	  },true,$obj);
	};
	var contentAdded  = function($obj){
	    if(typeof initUnveilImg == 'function')
        initUnveilImg();
	};
  return{
    loadNextPage     : loadNextPage,
    loadPage     : loadPage,
    addScrollFunction	:addScrollFunction
  }
})();
executeOnReady(function(){
	Elagan.infiniteScroll.addScrollFunction($("body"));
		$('#brandsolution').on('mouseover',function(){
	    setTimeout(function(){
	      $(window).trigger("scroll");
	    },200);
  	});
	var txtLen = $('.author-box2 .author_info em').text().length;
	if(deviceType != 'mobile'){
		if(txtLen < 170){
			$('.author-box2 .author_info em').addClass('full-detail');
		}
	}
	$('.author-box2 .author_info em').click(function (e) {
        if (e.offsetX > e.target.offsetLeft) {
            $(this).addClass('full-detail');
        }
         else{
           //console.log("true");
       }
  	});
  	$("#search_form").on('submit',function(e){
        if($("#search_form [name=q]").val().trim().length == 0)
        {
          e.preventDefault();return;
        }
        $("#search_form").attr('action',$("#search_form").attr('action')+'/'+($("#search_form [name=q]").val().trim()));
        $("#search_form [name=q]").remove();
    });
    $('.fa-search').on('click', function(){
      $("#search_form").submit();
    });
    var mlen = $('.nav-level1 > li').length; 
    if(mlen <= 5){
      $('.nav-level1 > li .brand-solutions').addClass('show-rhs');
    }
	$('.nav-level1 > li a').on('mouseover', function() {
        unvielImg('#header', true);
    }); 
	unvielImg('#header', true);
});

executeOnReady(function(){
  $(".flexi-audio audio").on("play",function(e){
    if($("link[rel=b2b_canonical]").attr('href') != $(this).data("href"))
    Elagan.ga.sendGA("pageview",{"location":$(this).data("href").replace(document.location.protocol+"//"+document.location.hostname,"")});
    Elagan.ga.sendGA("event",{"category":"podcast","action":"play","label":$(this).data("href").replace(document.location.protocol+"//"+document.location.hostname,"")})
  });
  window._ibeat_track= {
    sCookie: (!b2bGdpr.isgdprnation || b2bGdpr.userPreference['config.ibeat'] == 1)?true:false
  }
  loadScript('https://agi-static.indiatimes.com/cms-common/ibeat.min.js');

  	$('.customshare').on('click', function(){
		var shareType = $(this).attr('data-type');
		var shareEvents = [{'type':'fb', 'value':'Facebook','actionType':'share'}, {'type':'tw', 'value':'Twitter', 'actionType':'tweet'}, {'type':'lnkin', 'value':'LinkedIN', 'actionType':'share'}, {'type':'telegram', 'value':'Telegram', 'actionType':'share'}, {'type':'Whatsapp', 'value':'Whatsapp','actionType':'share'}, {'type':'email', 'value':'Email','actionType':'share'}];
		for(var i=0; i < shareEvents.length; i++){
			if(shareType == shareEvents[i].type){
				var dataset = {
					socialnetwork : shareEvents[i].value,
					actiontype : shareEvents[i].actionType,
					event: 'socialaction'
				};                
				dataLayer.push(dataset);				
			}
		}
	});
});

executeOnComplete(function(){
	//loadVideo();
  	// if($slikeAudio){
	  //   setTimeout(function(){
	  //     loadPlayer();
	  //   },2000);
  	// }
});

renderToolTips = function() {
    if ($('.tooltip-v2').length) {
        $('.tooltip-v2').addClass('mintip');
        loadScript(resourceURLMap.js["tooltip"], function() {
            $.minTips();
        });
        loadCss(THEME_PATH + '/jquery-tooltip-custom.css?mod=' + file_version);
    }
}
inPagePromoCallback = function($obj){
    if(typeof $obj == 'string')
        $obj = $($obj);
    renderToolTips();
    inPageCheckAuthorCarouselControl($obj);    
    $obj.find('.authorsection .slides').on('scroll',function(){
        initUnveilImg();
        $('#mintip').remove();//to close tooltip
    })
}

if(base_url.indexOf("-cms.")>1){

}else{
// To execute GTM
	loadScript(JS_PATH+'/../js/app.analytics.gtm.js?mod=' + file_version);


// const params_proxy = new Proxy(new URLSearchParams(window.location.search), {
//     get: (searchParams, prop) => searchParams.get(prop),
// });
const params_proxy = window.location.search;
$(document).ready(function(){
	
	deleteCookie('traffic_variables','',0);

	var trafficVar;
	trafficVar = getLocalStorage('traffic_variables');
	if(params_proxy && !trafficVar){
		setLocalStorage('traffic_variables', params_proxy, 1);		
		trafficVar = getLocalStorage('traffic_variables');
	}
	if($('body').hasClass('microsite')){
		$('.btn-wrapper a').each(function(i, val){
			if ($(val).attr('href') && ($(val).attr('href').indexOf("/payment") > -1 || $(val).attr('href').indexOf("/nomination") > -1)) {
				
				var dataset = {
					traffic_variables: trafficVar ? trafficVar : 'direct',
					event: 'payment_funnel_plan_widget_impression'
				};                
				dataLayer.push(dataset);	
			}		
		});
	}

	$('body').on('click', 'a', function(){
		var ctaTxt = $(this).html();
		var obj = {};
		if($(this).attr('href') && ($(this).attr('href').indexOf("/payment") > -1 || $(this).attr('href').indexOf("/nomination") > -1)){
			
			obj = {
				'btn_click': true,
				'cta_text': ctaTxt,
				'cta_position': 'middle'
			}
			setLocalStorage('payment_click', obj, 1);
			var dataset = {
				traffic_variables: trafficVar ? trafficVar : 'direct',
				event: 'payment_funnel_cta_click',
				cta_text: ctaTxt,
				cta_position:'middle'
			};                
			dataLayer.push(dataset);
		}
	});
	 

	$('body').on('click', '#paybtn, #submit_but', function(){
		console.log($(this).val());
	});

	// const initCB = window.paymentInitCB();
	// initCB();
});
}


function deleteCookie(c_name, value, exdays) {
	var exdate = new Date();
	exdate.setDate(exdate.getDate() + 0);
	var c_value = value + ((exdays==null) ? "" : "; path=/; domain="+COOKIE_SET_DOMAIN+"; expires="+exdate.toUTCString());				  
	document.cookie=c_name + "=" + c_value;
}

