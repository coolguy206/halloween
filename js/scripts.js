import $ from 'jquery';

$(document).ready(function () {
    console.log(`ready`);

    //? on page load get all entries & put on the page
    fetch('http://localhost:3000/', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', // Expect JSON data
        },
    }).then((res) => res.json()).then((data) => {
        // console.log('All Entries: ' + JSON.stringify(data));

        $('.c2 ul li').remove();

        var family = data;
        family.map((val, i) => {
            console.log(val, i);

            var parents = val.parent;
            var children = val.child;

            var theParents = ``;
            var theChildren = ``;

            if (parents.length < 2) {
                theParents = `and their Parent ${parents[0]}`
            } else {
                parents.map((arr, j) => {
                    theParents = `${theParents} ${arr},`
                });

                theParents = `and their Parents ${theParents}`;
            }

            if (children.length < 2) {
                theChildren = `<span>${children[0]}</span>`;
            } else {
                children.map((arr, j) => {
                    theChildren = `${theChildren} <span>${arr}</span>,`
                });
            }

            var elem = `<li><div>${theChildren} ${theParents}</div></li>`;

            $('.c2 ul').append(elem);

        });

    }).catch((error) => {
        console.error('Error:', error);
    });

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

        var id = `${$('input[name="child-1"]').val()}-${$('input[name="parent-1"]').val()}-${year}`;
        obj._id = id;

        console.log(obj);

        if (obj.parent.length !== 0 && obj.child.length !== 0) {

            //? Send data with fetch
            fetch('http://localhost:3000/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Send JSON data
                },
                body: JSON.stringify(obj), // Convert data to JSON
            }).then((res) => res.json()).then((data) => {
                console.log('Server says: ' + JSON.stringify(data));

                //? get all entries after submission & put on the page
                fetch('http://localhost:3000/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json', // Expect JSON data
                    },
                }).then((res) => res.json()).then((data) => {
                    // console.log('All Entries: ' + JSON.stringify(data));

                    $('.c2 ul li').remove();

                    var family = data;
                    family.map((val, i) => {
                        console.log(val, i);

                        var parents = val.parent;
                        var children = val.child;

                        var theParents = ``;
                        var theChildren = ``;

                        if (parents.length < 2) {
                            theParents = `and their Parent ${parents[0]}`
                        } else {
                            parents.map((arr, j) => {
                                theParents = `${theParents} ${arr},`
                            });

                            theParents = `and their Parents ${theParents}`;
                        }

                        if (children.length < 2) {
                            theChildren = `<span>${children[0]}</span>`;
                        } else {
                            children.map((arr, j) => {
                                theChildren = `${theChildren} <span>${arr}</span>,`
                            });
                        }

                        var elem = `<li><div>${theChildren} ${theParents}</div></li>`;

                        $('.c2 ul').append(elem);

                    });

                }).catch((error) => {
                    console.error('Error:', error);
                });

            });



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