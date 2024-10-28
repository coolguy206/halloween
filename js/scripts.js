import $ from 'jquery';
// import PouchDB from 'pouchdb';
// var localDB = new PouchDB('attendees-2024');
// var remoteDB = new PouchDB('http://david:LornaDamo206$@127.0.0.1:5984/attendees-2024');

// console.log(PouchDB);

$(document).ready(function () {
    console.log(`ready`);

    //? db info
    // localDB.info().then((data) => {
    //     console.log(data);
    // }).catch((err) => {
    //     console.log(err);
    // });

    // remoteDB.info().then((data) => {
    //     console.log(data);
    // }).catch((err) => {
    //     console.log(err);
    // });

    //? replicate db
    // localDB.replicate.to(remoteDB).on('complete', function (data) {
    //     // yay, we're done!
    //     console.log(`replicate successful`);
    //     console.log(data);
    // }).on('error', function (err) {
    //     // boo, something went wrong!
    //     console.log(`replicate NOT successful`);
    //     console.log(err);
    // });

    //? sync db
    // localDB.sync(remoteDB, {
    //     live: true,
    //     retry: true
    // }).on('complete', function (data) {
    //     // yay, we're done!
    //     console.log(`sync successful`);
    //     console.log(data);
    // }).on('error', function (err) {
    //     // boo, something went wrong!
    //     console.log(`sync NOT successful`);
    //     console.log(err);
    // });

    //? db changes
    // remoteDB.changes({
    //     since: 'now',
    //     live: true,
    //     include_docs: true
    // }).on('change', function (change) {
    //     // change.id contains the doc id, change.doc contains the docgit statyus
    //     console.log(`remoteDB changed`);
    //     console.log(change);

    //     $('.c2 ul li').remove();

    //     remoteDB.allDocs({ include_docs: true, descending: true }, function (err, data) {
    //         console.log(data);

    //         var family = data.rows;
    //         family.map((val, i) => {
    //             console.log(val, i);

    //             var parents = val.doc.parent;
    //             var children = val.doc.child;

    //             var theParents = ``;
    //             var theChildren = ``;

    //             if (parents.length < 2) {
    //                 theParents = `and their Parent ${parents[0]}`
    //             } else {
    //                 parents.map((arr, j) => {
    //                     theParents = `${theParents} ${arr},`
    //                 });

    //                 theParents = `and their Parents ${theParents}`;
    //             }

    //             if (children.length < 2) {
    //                 theChildren = `<span>${children[0]}</span>`;
    //             } else {
    //                 children.map((arr, j) => {
    //                     theChildren = `${theChildren} <span>${arr}</span>,`
    //                 });
    //             }

    //             var elem = `<li><div>${theChildren} ${theParents}</div></li>`;

    //             $('.c2 ul').append(elem);
    //         });

    //     });

    // }).on('error', function (err) {
    //     // handle errors
    //     console.log(`db changed error`);
    //     console.log(err);
    // });

    var year = new Date().getFullYear();
    $('header h1 span, footer p span').text(year);

    var makeInput = (elem, str, elem2) => {
        //?get number of inputs
        var num = $(elem).length;
        // console.log(num);

        //?add 1
        num = num + 1;

        //?make the elem
        var elem = `<div class="extra-input">
        <label>${str} Name</label>
        <a class="remove-input" href="#">remove</a>
        <input type="text" name="${str}-${num}" class="${str}">
        </div>`;

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
    })

    //? remove extra inputs
    $('body').on('click', '.remove-input', function (e) {
        e.preventDefault();
        console.log('removed input clicked');
        $(this).closest('.extra-input').remove();
    });

    //? destroy db
    // localDB.destroy().then((res) => {
    //     console.log('destroyed db');
    //     console.log(res);
    // })

    // remoteDB.destroy().then((res) => {
    //     console.log('destroyed db');
    //     console.log(res);
    // })

    //? on page load get db and show if any entries
    // remoteDB.allDocs({ include_docs: true, descending: true }, function (err, data) {
    //     // console.log(data);
    //     if (data.rows.length > 0) {
    //         var family = data.rows;
    //         family.map((val, i) => {
    //             // console.log(val, i);

    //             var parents = val.doc.parent;
    //             var children = val.doc.child;

    //             var theParents = ``;
    //             var theChildren = ``;

    //             if (parents.length < 2) {
    //                 theParents = `and their Parent ${parents[0]}`
    //             } else {
    //                 parents.map((arr, j) => {
    //                     theParents = `${theParents} ${arr},`
    //                 });

    //                 theParents = `and their Parents ${theParents}`;
    //             }

    //             if (children.length < 2) {
    //                 theChildren = `<span>${children[0]}</span>`;
    //             } else {
    //                 children.map((arr, j) => {
    //                     theChildren = `${theChildren} <span>${arr}</span>,`
    //                 });
    //             }

    //             var elem = `<li><div>${theChildren} ${theParents}</div></li>`;

    //             $('.c2 ul').append(elem);
    //         });
    //     }
    // });

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
        inputs.map((i, val) => {
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

        var id = `${$('input[name="child-1"]').val()}-${$('input[name="parent-1"]').val()}-2024`;
        obj._id = id;

        // console.log(obj);

        if (obj.parent.length !== 0 && obj.child.length !== 0) {

            //? send data to pouchdb
            // localDB.put(obj).then(function (response) {
            //     // handle response
            //     console.log(response);
            // }).then(function (data) {

            // $('.c2 ul li').remove();

            // remoteDB.allDocs({ include_docs: true, descending: true }, function (err, data) {
            //     console.log(data);

            //     var family = data.rows;
            //     family.map((val, i) => {
            //         console.log(val, i);

            //         var parents = val.doc.parent;
            //         var children = val.doc.child;

            //         var theParents = ``;
            //         var theChildren = ``;

            //         if (parents.length < 2) {
            //             theParents = `and their Parent ${parents[0]}`
            //         } else {
            //             parents.map((arr, j) => {
            //                 theParents = `${theParents} ${arr},`
            //             });

            //             theParents = `and their Parents ${theParents}`;
            //         }

            //         if (children.length < 2) {
            //             theChildren = `<span>${children[0]}</span>`;
            //         } else {
            //             children.map((arr, j) => {
            //                 theChildren = `${theChildren} <span>${arr}</span>,`
            //             });
            //         }

            //         var elem = `<li><div>${theChildren} ${theParents}</div></li>`;

            //         $('.c2 ul').append(elem);
            //     });

            // });

            // }).catch(function (err) {
            //     console.log(`oops something went wrong.`)
            //     console.log(err);

            //     if (err.status == 409) {
            //         console.log(err.message);
            //         var names = err.id;
            //         names = names.split('-');
            //         var str = `Looks like <span>${names[0]}</span> and <span>${names[1]}</span> has already been submitted.`;
            //         $('.error-message').html(str).show();
            //     }
            // });

        } else {
            var str = `Please enter a <span>parent</span> name and a <span>child</span> name.`;
            $('.error-message').html(str).show();
        }


    });
});