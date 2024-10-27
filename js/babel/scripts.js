"use strict";

var _pouchdb = _interopRequireDefault(require("pouchdb"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var $ = require('jquery');
var db = new _pouchdb["default"]('attendees');
$(document).ready(function () {
  console.log("ready");
  var year = new Date().getFullYear();
  $('header h1 span, footer p span').text(year);
  var makeInput = function makeInput(elem, str, elem2) {
    //?get number of inputs
    var num = $(elem).length;
    // console.log(num);

    //?add 1
    num = num + 1;

    //?make the elem
    var elem = "<div class=\"extra-input\">\n        <label>".concat(str, " Name</label>\n        <a class=\"remove-input\" href=\"#\">remove</a>\n        <input type=\"text\" name=\"").concat(str, "-").concat(num, "\" class=\"").concat(str, "\">\n        </div>");

    //?add the elem to the page
    $(elem2).before(elem);
  };

  //? add more inputs
  $('.add-more').on('click', function (e) {
    e.preventDefault();
    var elemClass = $(this).attr('class');
    // console.log(elemClass);

    if (elemClass.indexOf('parent') !== -1) {
      // console.log(`adding input for parents`);
      makeInput('input.parent', 'parent', 'button.add-more.parent');
    } else {
      // console.log(`adding input for children`)
      makeInput('input.child', 'child', 'button.add-more.child');
    }
  });

  //? remove extra inputs
  $('body').on('click', '.remove-input', function (e) {
    e.preventDefault();
    console.log('removed input clicked');
    $(this).closest('.extra-input').remove();
  });

  //? destroy db
  // db.destroy().then((res) => {
  //     console.log('destroyed db');
  //     console.log(res);
  // })

  //? remove a doc
  // db.remove('--2024');

  //? on page load get db and show if any entries
  db.allDocs({
    include_docs: true,
    descending: true
  }, function (err, data) {
    console.log(data);
    if (data.rows.length > 0) {
      var family = data.rows;
      family.map(function (val, i) {
        console.log(val, i);
        var parents = val.doc.parent;
        var children = val.doc.child;
        var theParents = "";
        var theChildren = "";
        if (parents.length < 2) {
          theParents = "and their Parent ".concat(parents[0]);
        } else {
          parents.map(function (arr, j) {
            theParents = "".concat(theParents, " ").concat(arr, ",");
          });
          theParents = "and their Parents ".concat(theParents);
        }
        if (children.length < 2) {
          theChildren = "<span>".concat(children[0], "</span>");
        } else {
          children.map(function (arr, j) {
            theChildren = "".concat(theChildren, " <span>").concat(arr, "</span>,");
          });
        }
        var elem = "<li><div>".concat(theChildren, " ").concat(theParents, "</div></li>");
        $('.c2 ul').append(elem);
      });
    }
  });
  $('.send').on('click', function (e) {
    e.preventDefault();
    $('.error-message').hide();
    $('.error-message').text('');
    var obj = {
      parent: [],
      child: []
    };

    //? get all the input and data
    var inputs = $('input');
    inputs.map(function (i, val) {
      // console.log(i, val);
      if ($(val).val() !== '') {
        // console.log($(val).val());
        // console.log($(val).attr('name'));

        var name = $(val).val();
        var attr = $(val).attr('name');
        if (attr.indexOf('parent') !== -1) {
          obj.parent.push(name);
        } else {
          obj.child.push(name);
        }
      }
    });
    var id = "".concat($('input[name="child-1"]').val(), "-").concat($('input[name="parent-1"]').val(), "-2024");
    obj._id = id;

    // console.log(obj);

    if (obj.parent.length !== 0 && obj.child.length !== 0) {
      //? send data to pouchdb
      db.put(obj).then(function (response) {
        // handle response
        // console.log(response);
      }).then(function (data) {
        $('.c2 ul li').remove();
        db.allDocs({
          include_docs: true,
          descending: true
        }, function (err, data) {
          console.log(data);
          var family = data.rows;
          family.map(function (val, i) {
            console.log(val, i);
            var parents = val.doc.parent;
            var children = val.doc.child;
            var theParents = "";
            var theChildren = "";
            if (parents.length < 2) {
              theParents = "and their Parent ".concat(parents[0]);
            } else {
              parents.map(function (arr, j) {
                theParents = "".concat(theParents, " ").concat(arr, ",");
              });
              theParents = "and their Parents ".concat(theParents);
            }
            if (children.length < 2) {
              theChildren = "<span>".concat(children[0], "</span>");
            } else {
              children.map(function (arr, j) {
                theChildren = "".concat(theChildren, " <span>").concat(arr, "</span>,");
              });
            }
            var elem = "<li><div>".concat(theChildren, " ").concat(theParents, "</div></li>");
            $('.c2 ul').append(elem);
          });
        });
      })["catch"](function (err) {
        console.log("oops something went wrong.");
        console.log(err);
        if (err.status == 409) {
          console.log(err.message);
          var names = err.id;
          names = names.split('-');
          var str = "Looks like <span>".concat(names[0], "</span> and <span>").concat(names[1], "</span> has already been submitted.");
          $('.error-message').html(str).show();
        }
      });
    } else {
      var str = "Please enter a <span>parent</span> name and a <span>child</span> name.";
      $('.error-message').html(str).show();
    }
  });
});
//# sourceMappingURL=scripts.js.map
