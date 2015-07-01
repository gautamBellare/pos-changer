/*
 * PosChanger (Position Pixel Perfect)
 * Version 3.4
 * 
 * Author: Gautam Bellare & Vikrant Shinde <India>
 * Based on Concept by: 
 * Juan Carlos Rojas Vargas <Costa Rica> - Email:juan.c.rojas.vargas@accenture.com - www.mopix.com
 * Email: gautam.bellare@accenture.com & vikrant.shinde@accenture.com
 * Plugin's website: www.posChanger.com(currently under works)
 * 
 * Copyright (C) 2014 Gautam Bellare & Vikrant Shinde
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE. 

 */

var posChangers = posChangers ? posChangers : {};
var classCollector = [];
var cssCollector = [];
var ele = [];
var searchEle = [];
var searchEleNum = [];
var cssPropAddText = [];
var cssPropAddStyle = [];
var cssPropAddAll = [];
var eleControl;
var anOption;
var eleSearchControl;
var anSearchOption;
var selectVal;
var selectSearchVal;
var topPos;
var onCheckaddedStyle;
var b = 1;
posChangers.mopix = mopix = (function (window, undefined) {
    ele.unshift("select");
    $("body *").addClass('tempClass');
    ele1 = $('.tempClass').find('*');
    for (i = 0; i < ele1.length; i++) {
        ele.push(ele1[i]);
    }
    $(ele1).each(function (i) {
        $(this).attr('name', 'tempName' + (i + 1));
    });

    var plugin = {
        name: 'PosChanger',
        longName: 'Position Pixel Perfect',
        version: '3.4',
        author: 'Gautam Bellare & Vikrant Shinde',
        lastUpdate: 'March 13, 2013',
        site: 'www.poschanger.com'
    },
        variables = {
            positionOffset: {
                x: 0,
                y: 0
            },
            isLoaded: false,
            guidesPosition: {
                verticalLineLeft: 0,
                verticalLineTop: 0,
                horizontalLineLeft: 0,
                horizontalLineTop: 0
            },
            launcherPosition: {
                x: 0,
                y: 0
            },
            touchSupport: false,
            mouseIsDown: false,
            isBookmarklet: false,
            generalHeight: '75px',//205px
            phoneHeight: '100px',
            minScreenHeight: 500,
            disableOverscroll: true,
            enableKeys: true,
            keepAliveOnClose: false,
            enableTouchGestures: false,
            bigSliderThumbSize: '30px',
            notesForeColor: '#f00',
            notesCount: 0,
            showScrollingButtons: false,
            imagesFilter: []
        },
        gestures = {
            launch: {
                touchedCorners: {
                    topLeft: false,
                    topRight: false,
                    bottomLeft: false,
                    bottomRight: false
                },
                areaSize: 80
            }
        },
        gui = {
            layers: {
                launcher: plugin.name + 'Launcher',
                imageContainer: plugin.name + 'ImageContainer',
                controlsContainer: plugin.name + 'ControlsContainer',
                thumbsContainer: plugin.name + 'ThumbsContainer',
                opacityValue: plugin.name + 'OpacityValue',
                buttonsContainer: plugin.name + 'ButtonsContainer',
                linesContainer: plugin.name + 'LinesContainer',
                verticalLine: plugin.name + 'VerticalLine',
                verticalLinePixels: plugin.name + 'VerticalLinePixels',
                horizontalLine: plugin.name + 'HorizontalLine',
                horizontalLinePixels: plugin.name + 'HorizontalLinePixels'
            },
            controls: {
                closeLauncher: plugin.name + 'CloseLauncher',
                closeUI: plugin.name + 'CloseUI',
                hideUI: plugin.name + 'HideUI',
                topLabel: plugin.name + 'topLabel',
                topPosition: plugin.name + 'TopPosition',
                opacitySlider: plugin.name + 'OpacitySlider',
                leftLabel: plugin.name + 'leftLabel',
                leftPosition: plugin.name + 'LeftPosition',
                scrollDown: plugin.name + 'ScrollDown',
                scrollUp: plugin.name + 'ScrollUp',
                dragImage: plugin.name + 'DragImage',
                showGuides: plugin.name + 'ShowGuides',
                moveVerticalLine: plugin.name + 'MoveVerticalLine',
                moveHorizontalLine: plugin.name + 'MoveHorizontalLine',
                moveUIToLeft: plugin.name + 'MoveToLeft',
                moveUIToRight: plugin.name + 'MoveToRight',
                addNoteButton: plugin.name + 'AddNote',
                editNotes: plugin.name + 'EditNotes',
                searchControl: plugin.name + 'searchControl',
                searchLabel: plugin.name + 'searchLabel',
                searchSelControl: plugin.name + 'searchSelControl',
                searchSelLabel: plugin.name + 'searchSelLabel',
                addSquareButton: plugin.name + 'AddSquare',
                elementName: plugin.name + 'ElementName',
                eleSearchControl: plugin.name + 'eleSearchControl',
                elementTopPos: plugin.name + 'elementTopPos',
                eleTopLabel: plugin.name + 'eleTopLabel',
                eleTopBtn: plugin.name + 'eleTopBtn',
                eleTopMinusBtn: plugin.name + 'eleTopMinusBtn',
                eleLeftLabel: plugin.name + 'eleLeftLabel',
                eleLeftPos: plugin.name + 'elementLeftPos',
                eleLeftBtn: plugin.name + 'eleLeftBtn',
                eleLeftMinusBtn: plugin.name + 'eleLeftMinusBtn',
                eleHeightPos: plugin.name + 'elementHeightPos',
                eleHeightBtn: plugin.name + 'eleHeightBtn',
                eleHeightMinusBtn: plugin.name + 'eleHeightMinusBtn',
                eleWidthPos: plugin.name + 'elementWidthPos',
                eleWidthBtn: plugin.name + 'eleWidthBtn',
                eleWidthMinusBtn: plugin.name + 'eleWidthMinusBtn',
                cssControl: plugin.name + 'cssControl',
                cssLabel: plugin.name + 'cssLabel',
                cssPadLabel: plugin.name + 'cssPadLabel',
                elePaddingControl: plugin.name + 'elePaddingControl',
                elePadBtn: plugin.name + 'elePadBtn',
                elePadMinusBtn: plugin.name + 'elePadMinusBtn',
                cssFontLabel: plugin.name + 'cssFontLabel',
                cssFontControl: plugin.name + 'cssFontControl',
                cssFontSizeLabel: plugin.name + 'cssFontSizeLabel',
                eleFontSizeControl: plugin.name + 'eleFontSizeControl',
                eleFontSizeBtn: plugin.name + 'eleFontSizeBtn',
                eleFontSizeMinusBtn: plugin.name + 'eleFontSizeMinusBtn',
                cssLineHeightLabel: plugin.name + 'cssLineHeightLabel',
                eleLineHeightControl: plugin.name + 'eleLineHeightControl',
                eleLineHeightBtn: plugin.name + 'eleLineHeightBtn',
                eleLineHeightMinusBtn: plugin.name + 'eleLineHeightMinusBtn',
                cssWordSpaceLabel: plugin.name + 'cssWordSpaceLabel',
                eleWordSpaceControl: plugin.name + 'eleWordSpaceControl',
                eleWordSpaceBtn: plugin.name + 'eleWordSpaceBtn',
                eleWordSpaceMinusBtn: plugin.name + 'eleWordSpaceMinusBtn',
                cssLetSpaceLabel: plugin.name + 'cssLetSpaceLabel',
                eleLetSpaceControl: plugin.name + 'eleLetSpaceControl',
                eleLetSpaceBtn: plugin.name + 'eleLetSpaceBtn',
                eleLetSpaceMinusBtn: plugin.name + 'eleLetSpaceMinusBtn',
                cssTextIndentLabel: plugin.name + 'cssTextIndentLabel',
                eleTextIndentControl: plugin.name + 'eleTextIndentControl',
                eleTextIndentBtn: plugin.name + 'eleTextIndentBtn',
                eleTextIndentMinusBtn: plugin.name + 'eleTextIndentMinusBtn',
                addCssLabel: plugin.name + 'addCssLabel',
                cssPropertyText: plugin.name + 'cssPropertyText',
                cssPropertyVal: plugin.name + 'cssPropertyVal',
                addedCssStyle: plugin.name + 'addedCssStyle',
                addCssSaveBtn: plugin.name + 'addCssSaveBtn'
            },
            classes: {
                clear: plugin.name + 'Clear',
                selectedThumbnail: plugin.name + 'SelectedThumbnail',
                bigSliderThumb: plugin.name + 'BigSliderThumb',
                noteContainer: plugin.name + 'Note',
                noteContent: plugin.name + 'NoteContent',
                moveNote: plugin.name + 'MoveNote',
                removeNote: plugin.name + 'RemoveNote',
                noteActionsContainer: plugin.name + 'NoteActions',
                squareActionsContainer: plugin.name + 'SquareActions',
                removeSquare: plugin.name + 'RemoveSquare',
                resizeSquare: plugin.name + 'ResizeSquare',
                squareContainer: plugin.name + 'Square'
            },
            rawElements: {
                blockSeparator: function () {
                    var separator = utils.createElement('div');
                    separator.className = gui.classes.clear;
                    utils.css(separator, {
                        clear: 'both'
                    });

                    return separator;
                }
            },
            create: function () {
                if ('ontouchmove' in window) variables.touchSupport = true;

                var launcher = utils.createElement('div');
                launcher.id = gui.layers.launcher;
                utils.css(launcher, {
                    background: '#000',
                    position: 'fixed',
                    color: '#fff',
                    left: '0px',
                    top: '100px',
                    padding: '5px',
                    textIndent: '2px',
                    font: 'normal 11px Tahoma, Verdana, Arial, sans-serif',
                    borderRadius: '3px',
                    boxShadow: '0 0 5px #000',
                    textShadow: '1px 1px 0 #000',
                    cursor: 'pointer',
                    '-webkit-user-select': 'none'
                });
                launcher.innerHTML = plugin.name;
                launcher.addEventListener('click', events.launcherClick);
                document.body.appendChild(launcher);

                var closeLauncher = utils.createElement('span');
                closeLauncher.addEventListener('click', events.closeLauncherClick);
                closeLauncher.id = gui.controls.closeLauncher;
                closeLauncher.innerHTML = '✗';
                utils.css(closeLauncher, {
                    display: 'inline-block',
                    marginLeft: '10px',
                    background: '#f00',
                    padding: '5px 10px',
                    borderRadius: '3px',
                    fontSize: '11px',
                    cursor: 'crosshair',
                    '-webkit-user-select': 'none'
                });
                launcher.appendChild(closeLauncher);
                launcher.addEventListener('touchstart', events.launcherTouchStart);
                launcher.addEventListener('touchmove', events.launcherTouchMove);

                var imageLayer = utils.createElement('div');
                utils.css(imageLayer, {
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: utils.getDocumentHeight() + 'px',
                    opacity: 0.5,
                    display: 'none',
                    cursor: 'move',
                    '-webkit-user-select': 'none'
                });
                utils.attr(imageLayer, {
                    id: gui.layers.imageContainer,
                    tabindex: 1
                });

                if (utils.isMobile()) {
                    imageLayer.addEventListener('click', events.imageContainerClick);
                } else {
                    imageLayer.addEventListener('dblclick', events.imageContainerClick);
                    imageLayer.addEventListener('keydown', events.moveWithKeys);
                }

                if (variables.touchSupport) {
                    imageLayer.addEventListener('touchstart', events.imageLayerTouchStart);
                    imageLayer.addEventListener('touchmove', events.imageLayerTouchMove);
                    imageLayer.addEventListener('touchend', events.imageLayerTouchEnd);
                } else {
                    imageLayer.addEventListener('mousedown', events.imageLayerMouseDown);
                    imageLayer.addEventListener('mouseup', events.imageLayerMouseUp);
                    imageLayer.addEventListener('mousemove', events.imageLayerMouseMove);
                }

                document.body.appendChild(imageLayer);

                var ui = utils.createElement('div');
                utils.css(ui, {
                    position: 'fixed',
                    right: '0',
                    top: '0',
                    background: '   grey',
                    display: 'none',
                    padding: '10px',
                    boxShadow: '1px 1px 10px #333',
                    font: 'normal 12px Tahoma, Verdana, Arial, sans-serif',
                    borderBottomLeftRadius: '3px',
                    borderBottomRightRadius: '3px',
                    opacity: '0.9',
                    maxWidth: (variables.showScrollingButtons === true) ? '280px' : '250px',
                    minWidth: (variables.showScrollingButtons === true) ? '280px' : '250px',
                    '-webkit-user-select': 'none'
                });
                ui.id = gui.layers.controlsContainer;
                document.body.appendChild(ui);

                var moveToLeft = utils.createElement('span');
                utils.css(moveToLeft, {
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    left: '5px', 
                    top: '12px',
                    borderRight: '20px solid #999',
                    borderTop: '15px solid transparent',
                    borderBottom: '15px solid transparent'
                });
                ui.appendChild(moveToLeft);
                moveToLeft.addEventListener('click', function () {
                    utils.css(ui, {
                        left: 0,
                        right: ''
                    }).css(moveToLeft, {
                        display: 'none'
                    }).css(moveToRight, {
                        display: 'block'
                    });
                });

                var moveToRight = utils.createElement('span');
                utils.css(moveToRight, {
                    position: 'absolute',
                    width: 0,
                    height: 0,
                    right: '5px',
                    top: '12px',
                    borderLeft: '20px solid #999',
                    borderTop: '15px solid transparent',
                    borderBottom: '15px solid transparent',
                    display: 'none'
                });
                ui.appendChild(moveToRight);
                moveToRight.addEventListener('click', function () {
                    utils.css(ui, {
                        left: '',
                        right: 0
                    }).css(moveToRight, {
                        display: 'none'
                    }).css(moveToLeft, {
                        display: 'block'
                    });
                });

                var title = utils.createElement('strong');
                utils.css(title, {
                    display: 'block',
                    textAlign: 'center',
                    marginBottom: '10px',
                    color: '#fff',
                    fontWeight: 'bold'
                });
                title.innerHTML = plugin.name + '<br>' + plugin.longName + ' v' + plugin.version;
                ui.appendChild(title);

                var opacityLabel = utils.createElement('label');
                opacityLabel.innerHTML = 'Opacity <span id="' + gui.layers.opacityValue + '">50</span>%:';
                utils.css(opacityLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(opacityLabel);

                var opacityControl = utils.createElement('input');
                utils.attr(opacityControl, {
                    type: 'range',
                    min: 0,
                    max: 100,
                    value: 50,
                    id: gui.controls.opacitySlider
                });
                utils.css(opacityControl, {
                    width: '58%',
                    'float': 'right'
                });
                opacityControl.addEventListener('change', events.opacityChanged);
                if (variables.touchSupport) {
                    opacityControl.addEventListener('touchmove', events.stopPropagation);
                }

                ui.appendChild(opacityControl);

                ui.appendChild(gui.rawElements.blockSeparator());

                var dragImageControl = utils.createElement('input');
                utils.attr(dragImageControl, {
                    type: 'checkbox',
                    id: gui.controls.dragImage
                    /*checked: 'checked'*/
                });
                utils.css(dragImageControl, {
                    verticalAlign: '-webkit-baseline-middle'
                });
                dragImageControl.addEventListener('change', events.allowImageDraggingCheckbox);
                ui.appendChild(dragImageControl);

                var dragImageLabel = utils.createElement('label');
                dragImageLabel.innerHTML = 'Drag Img';
                utils.attr(dragImageLabel, {
                    'for': gui.controls.dragImage
                });
                utils.css(dragImageLabel, {
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(dragImageLabel);

                var emptySpace = utils.createElement('span');
                emptySpace.innerHTML = '&nbsp;';
                ui.appendChild(emptySpace);

                var showGuidesControl = utils.createElement('input');
                utils.attr(showGuidesControl, {
                    type: 'checkbox',
                    id: gui.controls.showGuides
                });
                utils.css(showGuidesControl, {
                    verticalAlign: '-webkit-baseline-middle'
                });
                showGuidesControl.addEventListener('change', events.toggleGuides);
                ui.appendChild(showGuidesControl);

                var showGuidesLabel = utils.createElement('label');
                showGuidesLabel.innerHTML = 'Guides';
                utils.attr(showGuidesLabel, {
                    'for': gui.controls.showGuides
                });
                utils.css(showGuidesLabel, {
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(showGuidesLabel);

                var emptySpace = utils.createElement('span');
                emptySpace.innerHTML = '&nbsp;';
                ui.appendChild(emptySpace);


                // var editNotesControl = utils.createElement('input');
                // utils.attr(editNotesControl, {
                //     type: 'checkbox',
                //     id: gui.controls.editNotes,
                //     // checked: 'checked'
                // });
                // utils.css(editNotesControl, {
                //     verticalAlign: '-webkit-baseline-middle'
                // });
                // editNotesControl.addEventListener('change', events.editNotes);
                // ui.appendChild(editNotesControl);

                // var editNotesLabel = utils.createElement('label');
                // editNotesLabel.innerHTML = 'CSS';
                // utils.attr(editNotesLabel, {
                //     'for': gui.controls.editNotes
                // });
                // utils.css(editNotesLabel, {
                //     display: 'inline-block',
                //     verticalAlign: '-webkit-baseline-middle',
                //     color: '#000'
                // });
                // ui.appendChild(editNotesLabel);

                var editNotesControl = utils.createElement('input');
                utils.attr(editNotesControl, {
                    type: 'checkbox',
                    id: gui.controls.editNotes,
                    // checked: 'checked'
                });
                utils.css(editNotesControl, {
                    verticalAlign: '-webkit-baseline-middle'
                });
                editNotesControl.addEventListener('change', events.editNotes);
                ui.appendChild(editNotesControl);

                var editNotesLabel = utils.createElement('label');
                editNotesLabel.innerHTML = 'Notes';
                utils.attr(editNotesLabel, {
                    'for': gui.controls.editNotes
                });
                utils.css(editNotesLabel, {
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(editNotesLabel);

                var emptySpace = utils.createElement('span');
                emptySpace.innerHTML = '&nbsp;';
                ui.appendChild(emptySpace);

                var searchControl = utils.createElement('input');
                utils.attr(searchControl, {
                    type: 'checkbox',
                    id: gui.controls.searchControl
                    /*checked: 'checked'*/
                });
                utils.css(searchControl, {
                    verticalAlign: '-webkit-baseline-middle'
                });
                searchControl.addEventListener('change', events.searchControlCheckbox);
                ui.appendChild(searchControl);

                var searchLabel = utils.createElement('label');
                searchLabel.innerHTML = 'Search';
                utils.attr(searchLabel, {
                    'for': gui.controls.searchLabel
                });
                utils.css(searchLabel, {
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(searchLabel);

                ui.appendChild(gui.rawElements.blockSeparator());

                var searchSelLabel = utils.createElement('label');
                searchSelLabel.innerHTML = 'Search:';
                utils.attr(searchSelLabel, {
                    id: gui.controls.searchSelLabel
                });
                utils.css(searchSelLabel, {
                    width: '37%',
                    display: 'none',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(searchSelLabel);
                
                var searchSelControl = utils.createElement('input');

                utils.attr(searchSelControl, {
                    type: 'option',
                    name: 'searchSelControl',
                    value: '',
                    id: gui.controls.searchSelControl
                });
                utils.css(searchSelControl, {
                    width: '40%',
                    'margin-left': '-3px',
                    display: 'none'
                });
                searchSelControl.addEventListener('change', events.searchSelControlChanged);
                ui.appendChild(searchSelControl);

                ui.appendChild(gui.rawElements.blockSeparator());

                var eleLabel = utils.createElement('label');
                eleLabel.innerHTML = 'Elements:';
                utils.css(eleLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(eleLabel);
                
                var eleControl = utils.createElement('select');

                utils.attr(eleControl, {
                    type: 'option',
                    name: 'cmbElement',
                    value: '',
                    id: gui.controls.elementName
                });

                numOptions = ele.length;


                for (i = 0; i < numOptions; i++) {

                    anOption = document.createElement('option');
                    anOption.value = i;

                    if (i === 0) {
                        anOption.innerHTML = ele[i]; 
                    }
                    else {
                        var className = ele[i].className;
                        var idName = ele[i].id;
                        /*console.log(idName);*/
                        if (className === "tempClass" && idName != ""){
                                anOption.innerHTML = ele[i].nodeName +(" - ID: ")+ idName;
                                /*console.log(ele[i].nodeName);*/
                        }
                        else if (className === "tempClass" && idName === "") {
                            if (ele[i].nodeName === "BR") {
				            anOption.innerHTML = ele[i].nodeName +("- tag");
                            }
                            else{
                                anOption.innerHTML = ele[i].nodeName+("- tag"); 
                                /*console.log(ele[i].nodeName);*/
                            }
                        }
                        else {
                            anOption.innerHTML = ele[i].nodeName+(" - Class: ")+ele[i].className; 
                            /*console.log(ele[i].className);*/
                        }
                    }
                    (eleControl).appendChild(anOption);

                }
                /*console.log(anOption);*/
                

                utils.css(eleControl, {
                    width: '40%',
                    'margin-left': '-3px'
                });
                eleControl.addEventListener('change', events.elementChanged);
                ui.appendChild(eleControl);

                /*search control element combo box*/
                var eleSearchControl = utils.createElement('select');

                utils.attr(eleSearchControl, {
                    type: 'option',
                    name: 'eleSearchControl',
                    value: '',
                    id: gui.controls.eleSearchControl
                });

                utils.css(eleSearchControl, {
                    width: '40%',
                    'margin-left': '-3px',
                    'display' : 'none'
                });
                eleSearchControl.addEventListener('change', events.searchElementChanged);
                ui.appendChild(eleSearchControl);

                /*search element combo box ends*/

                ui.appendChild(gui.rawElements.blockSeparator());
                
                var eleTopLabel = utils.createElement('label');
                eleTopLabel.innerHTML = 'Top:';
                utils.attr(eleTopLabel, {
                    id: gui.controls.eleTopLabel
                });
                utils.css(eleTopLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',

                });
                ui.appendChild(eleTopLabel);

                var eleTopControl = utils.createElement('input'); 
                utils.attr(eleTopControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'topPosElement',
                    value: 0,
                    id: gui.controls.elementTopPos
                });
                utils.css(eleTopControl, {
                    width: '27%',
                    'margin-left': '-40px'
                });
                eleTopControl.addEventListener('change', events.elementTopChanged);
                ui.appendChild(eleTopControl);

                var eleTopBtn = utils.createElement('div');
                eleTopBtn.innerHTML = '+';
                utils.attr(eleTopBtn, {
                    name: 'eleTopBtn',
                    value: '+',
                    id: gui.controls.eleTopBtn
                });
                utils.css(eleTopBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleTopBtn.addEventListener('click', events.eleTopBtnClicked);
                ui.appendChild(eleTopBtn);

                var eleTopMinusBtn = utils.createElement('div');
                eleTopMinusBtn.innerHTML = '-';
                utils.attr(eleTopMinusBtn, {
                    name: 'eleTopMinusBtn',
                    value: '-',
                    id: gui.controls.eleTopMinusBtn
                });
                utils.css(eleTopMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleTopMinusBtn.addEventListener('click', events.eleTopMinusBtnClicked);
                ui.appendChild(eleTopMinusBtn);
                
                ui.appendChild(gui.rawElements.blockSeparator());
                
                var eleLeftLabel = utils.createElement('label');
                eleLeftLabel.innerHTML = 'Left:';
                utils.attr(eleLeftLabel, {
                    id: gui.controls.eleLeftLabel
                });
                utils.css(eleLeftLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(eleLeftLabel);
                
                var eleLeftControl = utils.createElement('input');
                utils.attr(eleLeftControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'leftPosElement',
                    value: 0,
                    id: gui.controls.eleLeftPos
                });
                utils.css(eleLeftControl, {
                    width: '27%',
                    'margin-left': '-40px'
                });
                eleLeftControl.addEventListener('change', events.elementLeftChanged);
                ui.appendChild(eleLeftControl);

                var eleLeftBtn = utils.createElement('div');
                eleLeftBtn.innerHTML = '+';
                utils.attr(eleLeftBtn, {
                    name: 'eleLeftBtn',
                    value: '+',
                    id: gui.controls.eleLeftBtn
                });
                utils.css(eleLeftBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleLeftBtn.addEventListener('click', events.eleLeftBtnClicked);
                ui.appendChild(eleLeftBtn);
                
                var eleLeftMinusBtn = utils.createElement('div');
                eleLeftMinusBtn.innerHTML = '-';
                utils.attr(eleLeftMinusBtn, {
                    name: 'eleLeftMinusBtn',
                    value: '-',
                    id: gui.controls.eleLeftMinusBtn
                });
                utils.css(eleLeftMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleLeftMinusBtn.addEventListener('click', events.eleLeftMinusBtnClicked);
                ui.appendChild(eleLeftMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());

                var eleHeightLabel = utils.createElement('label');
                eleHeightLabel.innerHTML = 'Height:';
                utils.css(eleHeightLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(eleHeightLabel);

                var eleHeightControl = utils.createElement('input');
                utils.attr(eleHeightControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'heightPosElement',
                    value: 0,
                    id: gui.controls.eleHeightPos
                });
                utils.css(eleHeightControl, {
                    width: '27%',
                    'margin-left': '-40px'
                });
                eleHeightControl.addEventListener('change', events.elementHeightChanged);
                ui.appendChild(eleHeightControl);

                var eleHeightBtn = utils.createElement('div');
                eleHeightBtn.innerHTML = '+';
                utils.attr(eleHeightBtn, {
                    name: 'eleHeightBtn',
                    value: '+',
                    id: gui.controls.eleHeightBtn
                });
                utils.css(eleHeightBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleHeightBtn.addEventListener('click', events.eleHeightBtnClicked);
                ui.appendChild(eleHeightBtn);
 
                var eleHeightMinusBtn = utils.createElement('div');
                eleHeightMinusBtn.innerHTML = '-';
                utils.attr(eleHeightMinusBtn, {
                    name: 'eleHeightMinusBtn',
                    value: '-',
                    id: gui.controls.eleHeightMinusBtn
                });
                utils.css(eleHeightMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleHeightMinusBtn.addEventListener('click', events.eleHeightMinusBtnClicked);
                ui.appendChild(eleHeightMinusBtn);


                ui.appendChild(gui.rawElements.blockSeparator());

                var eleWidthLabel = utils.createElement('label');
                eleWidthLabel.innerHTML = 'Width:';
                utils.css(eleWidthLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(eleWidthLabel);

                var eleWidthControl = utils.createElement('input'); 
                utils.attr(eleWidthControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'widthPosElement',
                    value: 0,
                    id: gui.controls.eleWidthPos
                });
                utils.css(eleWidthControl, {
                    width: '27%',
                    'margin-left': '-40px'
                });
                eleWidthControl.addEventListener('change', events.elementWidthChanged);
                ui.appendChild(eleWidthControl);
              
                var eleWidthBtn = utils.createElement('div');
                eleWidthBtn.innerHTML = '+';
                utils.attr(eleWidthBtn, {
                    name: 'eleWidthBtn',
                    value: '+',
                    id: gui.controls.eleWidthBtn
                });
                utils.css(eleWidthBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                });
                eleWidthBtn.addEventListener('click', events.eleWidthBtnClicked);
                ui.appendChild(eleWidthBtn);
              
                var eleWidthMinusBtn = utils.createElement('div');
                eleWidthMinusBtn.innerHTML = '-';
                utils.attr(eleWidthMinusBtn, {
                    name: 'eleWidthMinusBtn',
                    value: '-',
                    id: gui.controls.eleWidthMinusBtn
                });
                utils.css(eleWidthMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px'
                });
                eleWidthMinusBtn.addEventListener('click', events.eleWidthMinusBtnClicked);
                ui.appendChild(eleWidthMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());
              
                var cssLabel = utils.createElement('label');
                cssLabel.innerHTML = 'Other Styles:';
                utils.css(cssLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(cssLabel);
              
                var cssControl = utils.createElement('select');

                utils.attr(cssControl, {
                    type: 'option',
                    name: 'cssControl',
                    value: '',
                    id: gui.controls.cssControl
                });

                utils.css(cssControl, {
                    width: '50%',
                    'margin-left': '-3px'
                });
                cssControl.addEventListener('change', events.cssElementChanged);
                ui.appendChild(cssControl);

                ui.appendChild(gui.rawElements.blockSeparator());
               
                var cssPadLabel = utils.createElement('label');
                cssPadLabel.innerHTML = 'Padding-Top:';
                utils.attr(cssPadLabel, {
                    id: gui.controls.cssPadLabel
                });
                utils.css(cssPadLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssPadLabel);
           
                var elePaddingControl = utils.createElement('input');
                utils.attr(elePaddingControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'elePaddingControl',
                    value: 0,
                    id: gui.controls.elePaddingControl
                });
                utils.css(elePaddingControl, {
                    width: '17%',
                    'margin-left': '11px',
                    'display' : 'none'
                });
                elePaddingControl.addEventListener('change', events.elementPadChanged);
                ui.appendChild(elePaddingControl);
                
                var elePadBtn = utils.createElement('div');
                elePadBtn.innerHTML = '+';
                utils.attr(elePadBtn, {
                    name: 'elePadBtn',
                    value: '+',
                    id: gui.controls.elePadBtn
                });
                utils.css(elePadBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                elePadBtn.addEventListener('click', events.elePadBtnClicked);
                ui.appendChild(elePadBtn);
             
                var elePadMinusBtn = utils.createElement('div');
                elePadMinusBtn.innerHTML = '-';
                utils.attr(elePadMinusBtn, {
                    name: 'elePadMinusBtn',
                    value: '-',
                    id: gui.controls.elePadMinusBtn
                });
                utils.css(elePadMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                elePadMinusBtn.addEventListener('click', events.elePadMinusBtnClicked);
                ui.appendChild(elePadMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());
 
                var cssFontLabel = utils.createElement('label'); 
                cssFontLabel.innerHTML = 'Font-Family:';
                utils.attr(cssFontLabel, {
                    id: gui.controls.cssFontLabel
                });
                utils.css(cssFontLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssFontLabel);

                var cssFontControl = utils.createElement('select');

                utils.attr(cssFontControl, {
                    type: 'option',
                    name: 'cssFontControl',
                    value: '',
                    id: gui.controls.cssFontControl
                });

                utils.css(cssFontControl, {
                    width: '50%',
                    'margin-left': '24px',
                    'display': 'none'
                });
                cssFontControl.addEventListener('change', events.cssFontElementChanged);
                ui.appendChild(cssFontControl);

                ui.appendChild(gui.rawElements.blockSeparator());
                
                var cssFontSizeLabel = utils.createElement('label');
                cssFontSizeLabel.innerHTML = 'Font-size:';
                utils.attr(cssFontSizeLabel, {
                    id: gui.controls.cssFontSizeLabel
                });
                utils.css(cssFontSizeLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssFontSizeLabel);         
                
                var eleFontSizeControl = utils.createElement('input'); 
                utils.attr(eleFontSizeControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'eleFontSizeControl',
                    value: 0,
                    id: gui.controls.eleFontSizeControl
                });
                utils.css(eleFontSizeControl, {
                    width: '17%',
                    'margin-left': '11px',
                    'display' : 'none'
                });
                eleFontSizeControl.addEventListener('change', events.elementFontSizeChanged);
                ui.appendChild(eleFontSizeControl);
     
                var eleFontSizeBtn = utils.createElement('div');
                eleFontSizeBtn.innerHTML = '+';
                utils.attr(eleFontSizeBtn, {
                    name: 'eleFontSizeBtn',
                    value: '+',
                    id: gui.controls.eleFontSizeBtn
                });
                utils.css(eleFontSizeBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleFontSizeBtn.addEventListener('click', events.eleFontSizeBtnClicked);
                ui.appendChild(eleFontSizeBtn);
         
                var eleFontSizeMinusBtn = utils.createElement('div');
                eleFontSizeMinusBtn.innerHTML = '-';
                utils.attr(eleFontSizeMinusBtn, {                    name: 'eleFontSizeMinusBtn',
                    value: '-',
                    id: gui.controls.eleFontSizeMinusBtn
                });
                utils.css(eleFontSizeMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleFontSizeMinusBtn.addEventListener('click', events.eleFontSizeMinusBtnClicked);
                ui.appendChild(eleFontSizeMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());
                 
                var cssLineHeightLabel = utils.createElement('label'); 
                cssLineHeightLabel.innerHTML = 'Line-Height:';
                utils.attr(cssLineHeightLabel, {
                    id: gui.controls.cssLineHeightLabel
                });
                utils.css(cssLineHeightLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssLineHeightLabel);
              
                var eleLineHeightControl = utils.createElement('input'); 
                utils.attr(eleLineHeightControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'eleLineHeightControl',
                    value: 0,
                    id: gui.controls.eleLineHeightControl
                });
                utils.css(eleLineHeightControl, {
                    width: '17%',
                    'margin-left': '11px',
                    'display' : 'none'
                });
                eleLineHeightControl.addEventListener('change', events.elementLineHeightChanged);
                ui.appendChild(eleLineHeightControl);
         
                var eleLineHeightBtn = utils.createElement('div');
                eleLineHeightBtn.innerHTML = '+';
                utils.attr(eleLineHeightBtn, {
                    name: 'eleLineHeightBtn',
                    value: '+',
                    id: gui.controls.eleLineHeightBtn
                });
                utils.css(eleLineHeightBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleLineHeightBtn.addEventListener('click', events.eleLineHeightBtnClicked);
                ui.appendChild(eleLineHeightBtn);
          
                var eleLineHeightMinusBtn = utils.createElement('div');
                eleLineHeightMinusBtn.innerHTML = '-';
                utils.attr(eleLineHeightMinusBtn, {
                    name: 'eleLineHeightMinusBtn',
                    value: '-',
                    id: gui.controls.eleLineHeightMinusBtn
                });
                utils.css(eleLineHeightMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleLineHeightMinusBtn.addEventListener('click', events.eleLineHeightMinusBtnClicked);
                ui.appendChild(eleLineHeightMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());
                
                var cssWordSpaceLabel = utils.createElement('label');
                cssWordSpaceLabel.innerHTML = 'Word-Spacing:';
                utils.attr(cssWordSpaceLabel, {
                    id: gui.controls.cssWordSpaceLabel
                });
                utils.css(cssWordSpaceLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssWordSpaceLabel);
       
                var eleWordSpaceControl = utils.createElement('input'); 
                utils.attr(eleWordSpaceControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'eleWordSpaceControl',
                    value: 0,
                    id: gui.controls.eleWordSpaceControl
                });
                utils.css(eleWordSpaceControl, {
                    width: '17%',
                    'margin-left': '11px',
                    'display' : 'none'
                });
                eleWordSpaceControl.addEventListener('change', events.elementWordSpaceChanged);
                ui.appendChild(eleWordSpaceControl);
      
                var eleWordSpaceBtn = utils.createElement('div');
                eleWordSpaceBtn.innerHTML = '+';
                utils.attr(eleWordSpaceBtn, {
                    name: 'eleWordSpaceBtn',
                    value: '+',
                    id: gui.controls.eleWordSpaceBtn
                });
                utils.css(eleWordSpaceBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleWordSpaceBtn.addEventListener('click', events.eleWordSpaceBtnClicked);
                ui.appendChild(eleWordSpaceBtn);
  
                var eleWordSpaceMinusBtn = utils.createElement('div');
                eleWordSpaceMinusBtn.innerHTML = '-';
                utils.attr(eleWordSpaceMinusBtn, {
                    name: 'eleWordSpaceMinusBtn',
                    value: '-',
                    id: gui.controls.eleWordSpaceMinusBtn
                });
                utils.css(eleWordSpaceMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleWordSpaceMinusBtn.addEventListener('click', events.eleWordSpaceMinusBtnClicked);
                ui.appendChild(eleWordSpaceMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());
                 
                var cssLetSpaceLabel = utils.createElement('label'); 
                cssLetSpaceLabel.innerHTML = 'Letter-Spacing:';
                utils.attr(cssLetSpaceLabel, {
                    id: gui.controls.cssLetSpaceLabel
                });
                utils.css(cssLetSpaceLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssLetSpaceLabel);

                var eleLetSpaceControl = utils.createElement('input');
                utils.attr(eleLetSpaceControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'eleLetSpaceControl',
                    value: 0,
                    id: gui.controls.eleLetSpaceControl
                });
                utils.css(eleLetSpaceControl, {
                    width: '17%',
                    'margin-left': '11px',
                    'display' : 'none'
                });
                eleLetSpaceControl.addEventListener('change', events.elementLetSpaceChanged);
                ui.appendChild(eleLetSpaceControl);
         
                var eleLetSpaceBtn = utils.createElement('div');
                eleLetSpaceBtn.innerHTML = '+';
                utils.attr(eleLetSpaceBtn, {
                    name: 'eleLetSpaceBtn',
                    value: '+',
                    id: gui.controls.eleLetSpaceBtn
                });
                utils.css(eleLetSpaceBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleLetSpaceBtn.addEventListener('click', events.eleLetSpaceBtnClicked);
                ui.appendChild(eleLetSpaceBtn);
       
                var eleLetSpaceMinusBtn = utils.createElement('div');
                eleLetSpaceMinusBtn.innerHTML = '-';
                utils.attr(eleLetSpaceMinusBtn, {
                    name: 'eleLetSpaceMinusBtn',
                    value: '-',
                    id: gui.controls.eleLetSpaceMinusBtn
                });
                utils.css(eleLetSpaceMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleLetSpaceMinusBtn.addEventListener('click', events.eleLetSpaceMinusBtnClicked);
                ui.appendChild(eleLetSpaceMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());

                var cssTextIndentLabel = utils.createElement('label'); 
                cssTextIndentLabel.innerHTML = 'Text-Indent:';
                utils.attr(cssTextIndentLabel, {
                    id: gui.controls.cssTextIndentLabel
                });
                utils.css(cssTextIndentLabel, {
                    width: '37%',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(cssTextIndentLabel);

                var eleTextIndentControl = utils.createElement('input');
                utils.attr(eleTextIndentControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    name: 'eleTextIndentControl',
                    value: 0,
                    id: gui.controls.eleTextIndentControl
                });
                utils.css(eleTextIndentControl, {
                    width: '17%',
                    'margin-left': '11px',
                    'display' : 'none'
                });
                eleTextIndentControl.addEventListener('change', events.elementTextIndentChanged);
                ui.appendChild(eleTextIndentControl);
         
                var eleTextIndentBtn = utils.createElement('div');
                eleTextIndentBtn.innerHTML = '+';
                utils.attr(eleTextIndentBtn, {
                    name: 'eleTextIndentBtn',
                    value: '+',
                    id: gui.controls.eleTextIndentBtn
                });
                utils.css(eleTextIndentBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '126px',
                    'margin-top' : '-24px',
                    'fontSize' : '22px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleTextIndentBtn.addEventListener('click', events.eleTextIndentBtnClicked);
                ui.appendChild(eleTextIndentBtn);
       
                var eleTextIndentMinusBtn = utils.createElement('div');
                eleTextIndentMinusBtn.innerHTML = '-';
                utils.attr(eleTextIndentMinusBtn, {
                    name: 'eleTextIndentMinusBtn',
                    value: '-',
                    id: gui.controls.eleTextIndentMinusBtn
                });
                utils.css(eleTextIndentMinusBtn, {
                    width: '30%',
                    'text-align': 'center',
                    color: '#fff',
                    'margin-left': '185px',
                    'margin-top' : '-64px',
                    'fontSize' : '40px',
                    'cursor' : 'pointer',
                    'height' : '53px',
                    'display' : 'none'
                });
                eleTextIndentMinusBtn.addEventListener('click', events.eleTextIndentMinusBtnClicked);
                ui.appendChild(eleTextIndentMinusBtn);

                ui.appendChild(gui.rawElements.blockSeparator());

                var cssPropertyText = utils.createElement('input');
                utils.attr(cssPropertyText, {
                    type: 'text',
                    name: 'cssPropertyText',
                    placeholder: 'CSS Attribute',
                    id: gui.controls.cssPropertyText
                });
                utils.css(cssPropertyText, {
                    width: '38%',
                    'float': 'left',
                    display: 'none'
                });
                cssPropertyText.addEventListener('change', events.cssPropertyTextChanged);
                ui.appendChild(cssPropertyText);

                var addCssLabel = utils.createElement('label');
                addCssLabel.innerHTML = ' : ';
                utils.attr(addCssLabel, {
                    id: gui.controls.addCssLabel
                });
                utils.css(addCssLabel, {
                    width: '10%',
                    display: 'none',
                    verticalAlign: '-webkit-baseline-middle',
                    'float': 'left',
                    color: '#000',
                    'margin-left': '3px',
                    'margin-top' : '4px'
                });
                ui.appendChild(addCssLabel);

                var cssPropertyVal = utils.createElement('input');
                utils.attr(cssPropertyVal, {
                    type: ' text',
                    name: 'cssPropertyVal',
                    placeholder: '0px',
                    disabled: 'true',
                    id: gui.controls.cssPropertyVal
                });
                utils.css(cssPropertyVal, {
                    width: '30%',
                    'float': 'left',
                    display: 'none',
                    'margin-left': '-20px'
                });
                cssPropertyVal.addEventListener('input', events.cssPropertyValChanged);
                ui.appendChild(cssPropertyVal);

                var emptySpace = utils.createElement('span');
                emptySpace.innerHTML = '&nbsp;';
                ui.appendChild(emptySpace);

                var addCssSaveBtn = utils.createElement('div');
                addCssSaveBtn.innerHTML = 'Add';
                utils.attr(addCssSaveBtn, {
                    name: 'addCssSaveBtn',
                    value: 'Add',
                    contenteditable: 'true',
                    id: gui.controls.addCssSaveBtn
                });
                utils.css(addCssSaveBtn, {
                    width: '14%',
                    'text-align': 'center',
                    color: '#fff',
                    'fontSize' : '15px',
                    'cursor' : 'pointer',
                    'height' : '21px',
                    'border' : '1px solid #fff',
                    'border-radius' : '5px',
                    'float' : 'left',
                    'margin-left' : '5px',
                    'margin-top' : '0px',
                    'display' : 'none'
                });
                addCssSaveBtn.addEventListener('click', events.addCssSaveBtnClicked);
                ui.appendChild(addCssSaveBtn);

                ui.appendChild(gui.rawElements.blockSeparator());   

                var addedCssStyle = utils.createElement('div');
                addedCssStyle.innerHTML = '';
                utils.attr(addedCssStyle, {
                    name: 'addedCssStyle',
                    id: gui.controls.addedCssStyle
                });
                utils.css(addedCssStyle, {
                    width: '230px',
                    color: '#fff',
                    'margin-left': '5px',
                    'margin-top' : '4px',
                    'fontSize' : '13px',
                    'height' : '100px',
                    'border' : '1px solid #fff',
                    'overflow' : 'auto',
                    'display' : 'none'
                });
                addedCssStyle.addEventListener('click', events.addedCssStyleClicked);
                ui.appendChild(addedCssStyle);

                ui.appendChild(gui.rawElements.blockSeparator()); 

                // var addCssApplyBtn = utils.createElement('button');
                // addCssApplyBtn.innerHTML = 'Update Css';
                // utils.attr(addCssApplyBtn, {
                //     name: 'addCssApplyBtn',
                //     value: 'Update Css',
                //     id: gui.controls.addCssApplyBtn
                // });
                // utils.css(addCssApplyBtn, {
                //     width: '150px',
                //     'text-align': 'center',
                //     color: '#585858',
                //     'margin-left': '50px',
                //     'margin-top' : '5px',
                //     'fontSize' : '15px',
                //     'cursor' : 'pointer',
                //     'height' : '25px',
                //     'display' : 'none'
                // });
                // addCssApplyBtn.addEventListener('click', events.addCssApplyBtnClicked);
                // ui.appendChild(addCssApplyBtn);

                // ui.appendChild(gui.rawElements.blockSeparator());

                
                var topLabel = utils.createElement('label');
                topLabel.innerHTML = 'Pixels Top/Y:';
                utils.attr(topLabel, {
                    id: gui.controls.topLabel
                });
                utils.css(topLabel, {
                    width: '37%',
                    display: 'none',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000'
                });
                ui.appendChild(topLabel);

                var topControl = utils.createElement('input');
                utils.attr(topControl, {
                    type: 'number',
                    pattern: '[0-9]',
                    value: 0,
                    id: gui.controls.topPosition
                });
                utils.css(topControl, {
                    width: '58%',
                    'float': 'right',
                    display: 'none'
                });
                topControl.addEventListener('change', events.topPositionChanged);
                ui.appendChild(topControl);

                ui.appendChild(gui.rawElements.blockSeparator());

                var leftLabel = utils.createElement('label');
                leftLabel.innerHTML = 'Pixels Left/X:';
                utils.attr(leftLabel, {
                    id: gui.controls.leftLabel
                });
                utils.css(leftLabel, {
                    width: '37%',
                    display: 'inline-block',
                    verticalAlign: '-webkit-baseline-middle',
                    color: '#000',
                    display: 'none'
                });
                ui.appendChild(leftLabel);

                var leftControl = utils.createElement('input');
                utils.attr(leftControl, {
                    type: 'number',
                    value: 0,
                    pattern: '[0-9]',
                    id: gui.controls.leftPosition
                });
                utils.css(leftControl, {
                    width: '58%',
                    'float': 'right',
                    display: 'none'
                });
                leftControl.addEventListener('change', events.leftPositionChanged);
                ui.appendChild(leftControl);

                ui.appendChild(gui.rawElements.blockSeparator());

                var imagesList = utils.createElement('div');
                imagesList.id = gui.layers.thumbsContainer;
                ui.appendChild(imagesList);
                utils.css(imagesList, {
                    overflowY: 'scroll',
                    webkitOverflowScrolling: 'touch',
                    maxHeight: (screen.height < variables.minScreenHeight) ? variables.phoneHeight : variables.generalHeight,
                    margin: '5px 0'
                });

                if (variables.touchSupport) imagesList.addEventListener('touchmove', events.stopPropagation);

                ui.appendChild(gui.rawElements.blockSeparator());

                var buttonsContainer = utils.createElement('div');
                utils.css(buttonsContainer, {
                    textAlign: 'center'
                });
                buttonsContainer.id = gui.layers.buttonsContainer;
                ui.appendChild(buttonsContainer);

                var buttonScrollDown = utils.createElement('input');
                utils.attr(buttonScrollDown, {
                    unselectable: 'on',
                    type: 'button',
                    value: '▼',
                    id: gui.controls.scrollDown
                });
                utils.css(buttonScrollDown, {
                    padding: '5px 5px',
                    display: 'none'
                });
                buttonScrollDown.addEventListener('mousedown', events.scrollDown);
                buttonsContainer.appendChild(buttonScrollDown);

                var buttonHide = utils.createElement('input');
                utils.attr(buttonHide, {
                    type: 'button',
                    value: 'Hide',
                    unselectable: 'on',
                    id: gui.controls.hideUI
                });
                utils.css(buttonHide, {
                    padding: '5px 10px',
                    display: 'none'
                });
                buttonHide.addEventListener('click', events.hideUIClick);
                buttonsContainer.appendChild(buttonHide);

                var buttonAddNote = utils.createElement('input');
                utils.attr(buttonAddNote, {
                    type: 'button',
                    value: '✍',
                    id: gui.controls.addNoteButton,
                    unselectable: 'on',
                });
                utils.css(buttonAddNote, {
                    padding: '5px 10px'
                });
                buttonAddNote.addEventListener('click', events.addNoteButtonClick);
                buttonsContainer.appendChild(buttonAddNote);

                var buttonAddSquare = utils.createElement('input');
                utils.attr(buttonAddSquare, {
                    type: 'button',
                    value: '□',
                    id: gui.controls.addSquareButton,
                    unselectable: 'on'
                });
                utils.css(buttonAddSquare, {
                    padding: '5px 10px'
                });
                buttonAddSquare.addEventListener('click', events.addSquareButtonClick);
                buttonsContainer.appendChild(buttonAddSquare);



                var buttonClose = utils.createElement('input');
                utils.attr(buttonClose, {
                    type: 'button',
                    value: 'Close',
                    unselectable: 'on',
                    id: gui.controls.closeUI
                });
                buttonClose.addEventListener('click', events.closeUIClick);
                utils.css(buttonClose, {
                    padding: '5px 10px'
                });
                buttonsContainer.appendChild(buttonClose);

                ui.appendChild(gui.rawElements.blockSeparator());

                var buttonShowCss = utils.createElement('input');
                utils.attr(buttonShowCss, {
                    type: 'button',
                    value: 'Show All CSS',
                    unselectable: 'on',
                    id: gui.controls.showCss
                });
                buttonShowCss.addEventListener('click', events.showCssClick);
                utils.css(buttonShowCss, {
                    padding: '5px 10px'
                });
                buttonsContainer.appendChild(buttonShowCss);

                var buttonScrollUp = utils.createElement('input');
                utils.attr(buttonScrollUp, {
                    unselectable: 'on',
                    type: 'button',
                    value: '▲',
                    id: gui.controls.scrollUp
                });
                utils.css(buttonScrollUp, {
                    padding: '5px 5px',
                    display: 'none'
                });
                buttonScrollUp.addEventListener('mousedown', events.scrollUp);
                buttonsContainer.appendChild(buttonScrollUp);

                var timeInterval = setInterval(function () {
                    var uiLauncher = utils.getElement('#' + gui.layers.launcher)[0],
                        ui = utils.getElement('#' + gui.layers.controlsContainer)[0];

                    if (ui) utils.css(ui, {
                            zIndex: utils.getMaxIndex()
                        });

                    if (uiLauncher) {
                        utils.css(uiLauncher, {
                            zIndex: utils.getMaxIndex()
                        });
                    } else {
                        if (ui) {
                            utils.css(ui, {
                                zIndex: utils.getMaxIndex()
                            });
                        } else {
                            clearInterval(timeInterval);
                        }
                    }
                }, 1000);

                var verticalLine = utils.createElement('div');
                utils.attr(verticalLine, {
                    id: gui.layers.verticalLine
                });
                utils.css(verticalLine, {
                    height: '100%',
                    width: '1px',
                    background: '#f00',
                    left: '45px',
                    position: 'fixed',
                    top: 0,
                    display: 'none',
                    '-webkit-user-select': 'none'
                });
                document.body.appendChild(verticalLine);

                var moveVerticalLine = utils.createElement('div');
                utils.attr(moveVerticalLine, {
                    id: gui.controls.moveVerticalLine
                });
                utils.css(moveVerticalLine, {
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#f00',
                    opacity: 0.9,
                    left: '25px',
                    top: '95px',
                    display: 'none',
                    '-webkit-user-select': 'none'
                });
                document.body.appendChild(moveVerticalLine);
                moveVerticalLine.addEventListener('touchstart', events.verticalLineControlTouchStart);
                moveVerticalLine.addEventListener('touchmove', events.verticalLineControlTouchMove);

                if (utils.isMobile()) {
                    moveVerticalLine.addEventListener('click', events.verticalLineControlClick);
                } else {
                    moveVerticalLine.addEventListener('dblclick', events.verticalLineControlClick);
                }

                var verticalLinePixels = utils.createElement('div');
                utils.attr(verticalLinePixels, {
                    id: gui.layers.verticalLinePixels
                });
                utils.css(verticalLinePixels, {
                    position: 'absolute',
                    borderRadius: '0 3px 3px 0',
                    padding: '3px',
                    background: '#333',
                    opacity: 0.9,
                    color: '#fff',
                    fontSize: '12px',
                    top: '10px',
                    left: '46px',
                    fontFamily: 'Arial',
                    fontSize: '10px',
                    display: 'none',
                    '-webkit-user-select': 'none'
                });
                verticalLinePixels.innerHTML = '45px';
                document.body.appendChild(verticalLinePixels);
                verticalLinePixels.addEventListener('click', events.verticalLinePixelsTogglePosition);

                var horizontalLine = utils.createElement('div');
                utils.attr(horizontalLine, {
                    id: gui.layers.horizontalLine
                });
                utils.css(horizontalLine, {
                    height: '1px',
                    width: '100%',
                    background: '#f00',
                    left: 0,
                    top: '45px',
                    position: 'absolute',
                    display: 'none',
                    '-webkit-user-select': 'none'
                });
                document.body.appendChild(horizontalLine);

                var moveHorizontalLine = utils.createElement('div');
                utils.attr(moveHorizontalLine, {
                    id: gui.controls.moveHorizontalLine
                });
                utils.css(moveHorizontalLine, {
                    position: 'absolute',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: '#f00',
                    opacity: 0.9,
                    left: '425px',
                    top: '25px',
                    display: 'none',
                    '-webkit-user-select': 'none'
                });
                document.body.appendChild(moveHorizontalLine);
                moveHorizontalLine.addEventListener('touchstart', events.horizontalLineControlTouchStart);
                moveHorizontalLine.addEventListener('touchmove', events.horizontalLineControlTouchMove);

                if (utils.isMobile()) {
                    moveHorizontalLine.addEventListener('click', events.horizontalLineControlClick);
                } else {
                    moveHorizontalLine.addEventListener('dblclick', events.horizontalLineControlClick);
                }

                var horizontalLinePixels = utils.createElement('div');
                utils.attr(horizontalLinePixels, {
                    id: gui.layers.horizontalLinePixels
                });
                utils.css(horizontalLinePixels, {
                    position: 'absolute',
                    borderRadius: '0 0 3px 3px',
                    padding: '3px',
                    background: '#333',
                    opacity: 0.9,
                    color: '#fff',
                    fontSize: '10px',
                    top: '46px',
                    left: '10px',
                    fontFamily: 'Arial',
                    display: 'none',
                    '-webkit-user-select': 'none'
                });
                horizontalLinePixels.innerHTML = '45px';
                document.body.appendChild(horizontalLinePixels);
                horizontalLinePixels.addEventListener('click', events.horizontalLinePixelsTogglePosition);
            }
        },
        utils = {
            inFilter: function (theArray, theValue) {
                var result = false;
                for (var item = 0; item < theArray.length; item++) {
                    if (theValue.indexOf(theArray[item]) != -1) {
                        result = true;
                        break;
                    }
                }

                return result;
            },
            getElement: function (element) {
                return document.querySelectorAll(element);
            },
            getStyle: function (element, property) {
                return document.defaultView.getComputedStyle(element, null).getPropertyValue(property);
            },
            createElement: function (elementType) {
                return document.createElement(elementType);
            },
            css: function (element, styles) {
                for (var data in styles) {
                    element.style[data] = styles[data];
                }

                return this;
            },
            attr: function (element, attributes) {
                for (var data in attributes) {
                    element.setAttribute(data, attributes[data]);
                }

                return this;
            },
            getMaxIndex: function () {
                var documentElements = utils.getElement('*'),
                    maxIndex = 0;

                for (var element = 0; element < documentElements.length - 1; element++) {
                    if (parseInt(documentElements[element].style.zIndex) > maxIndex) {
                        maxIndex = parseInt(documentElements[element].style.zIndex);
                    }
                }

                return maxIndex + 1;
            },
            getDocumentHeight: function () {
                var body = document.body,
                    html = document.documentElement;

                return Math.max(body.scrollHeight, body.offsetHeight,
                    html.clientHeight, html.scrollHeight, html.offsetHeight);
            },
            createThumbnail: function (imageURL) {
                var thumbnail = utils.createElement('img');
                utils.attr(thumbnail, {
                    src: imageURL
                });
                utils.css(thumbnail, {
                    width: '30%',//47%
                    height: '70px',//100px
                    margin: '1px 1px -2px 2px',
                    border: 'solid 1px #ccc',
                    position: 'relative'
                });
                thumbnail.addEventListener('click', events.thumbnailClick);

                return thumbnail;
            },
            isMobile: function () {
                return (/webOS|iPhone|iPad|iPod|Android|BlackBerry/i.test(navigator.userAgent));
            }
        },
        events = {
            launcherClick: function () {
                publicMethods.restore();
            },
            closeLauncherClick: function (e) {
                e.stopPropagation();
                if (variables.keepAliveOnClose) {
                    publicMethods.hide();
                } else {
                    publicMethods.destroy();
                }
            },
            imageContainerClick: function () {
                var container = utils.getElement('#' + gui.layers.controlsContainer)[0];
                if (container.style.display == 'none') {
                    utils.css(container, {
                        display: 'block'
                    });
                } else {
                    utils.css(container, {
                        display: 'none'
                    });
                }
            },
            opacityChanged: function (e) {
                var newOpacity = parseInt(e.target.value) / 100,
                    guidesAreVisible = utils.getElement('#' + gui.controls.showGuides)[0].checked;
                utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                    opacity: newOpacity,
                    display: (newOpacity == 0) ? 'none' : 'block'
                });
                utils.getElement('#' + gui.layers.opacityValue)[0].innerText = e.target.value;

                utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                    display: (newOpacity == 0 && guidesAreVisible !== true) ? 'none' : 'inline-block'
                });

                if (utils.getStyle(utils.getElement('#' + gui.layers.imageContainer)[0], 'background-image') == 'none' &&
                    utils.getElement('#' + gui.controls.showGuides)[0].checked !== true) {
                    utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                        display: 'none'
                    });
                }
            },

            elementChanged: function (e) { 
                numOptions = ele.length;

                selectVal = $('select[name="cmbElement"] option:selected').text();
                var sv = $('select[name="cmbElement"] option:selected').val(); 

		
                var nameFound = document.getElementsByName('tempName' + (sv));
                var botSetLabel = utils.getElement('#' + gui.controls.eleTopLabel)[0]; 
                console.log(botSetLabel);
                var leftSetLabel = utils.getElement('#' + gui.controls.eleLeftLabel)[0]; 
                var topSetBox = utils.getElement('#' + gui.controls.elementTopPos)[0]; 
                var leftSetBox = utils.getElement('#' + gui.controls.eleLeftPos)[0]; 
                var heightSetBox = utils.getElement('#' + gui.controls.eleHeightPos)[0]; 
                var widthSetBox = utils.getElement('#' + gui.controls.eleWidthPos)[0]; 		
                var addButTop = utils.getElement('#' + gui.controls.eleTopBtn)[0]; 
                var addMinusButTop = utils.getElement('#' + gui.controls.eleTopMinusBtn)[0]; 
                var posInputTop = utils.getElement('#' + gui.controls.elementTopPos)[0]; 
                var posInputLeft = utils.getElement('#' + gui.controls.eleLeftPos)[0]; 
                var posInputHeight = utils.getElement('#' + gui.controls.eleHeightPos)[0]; 
                var posInputWidth = utils.getElement('#' + gui.controls.eleWidthPos)[0]; 
                
                var addButLeft = utils.getElement('#' + gui.controls.eleLeftBtn)[0]; 
                var addMinusButLeft = utils.getElement('#' + gui.controls.eleLeftMinusBtn)[0];
                var addButHeight = utils.getElement('#' + gui.controls.eleHeightBtn)[0]; 
                var addMinusButHeight = utils.getElement('#' + gui.controls.eleHeightMinusBtn)[0]; 
                var addButWidth = utils.getElement('#' + gui.controls.eleWidthBtn)[0];
                var addMinusButWidth = utils.getElement('#' + gui.controls.eleWidthMinusBtn)[0]; 
                var cssSetBox = utils.getElement('#' + gui.controls.cssControl)[0];
                var fontSetLabel = utils.getElement('#' + gui.controls.cssFontLabel)[0]; 
                var fontSetBox = utils.getElement('#' + gui.controls.cssFontControl)[0]; 
                fontSetLabel.style.display = "none";
                fontSetBox.style.display = "none";
                $(fontSetBox).empty();         
                var FontSizeSetLabel = utils.getElement('#' + gui.controls.cssFontSizeLabel)[0];
                var FontSizeSetBox = utils.getElement('#' + gui.controls.eleFontSizeControl)[0]; 
                var addButFontSize = utils.getElement('#' + gui.controls.eleFontSizeBtn)[0];
                var addMinusButFontSize = utils.getElement('#' + gui.controls.eleFontSizeMinusBtn)[0];
                $(FontSizeSetBox).empty();
                FontSizeSetLabel.style.display = "none";
                FontSizeSetBox.style.display = "none";
                addButFontSize.style.display = "none";
                addMinusButFontSize.style.display = "none";              
                var LineHeightSetLabel = utils.getElement('#' + gui.controls.cssLineHeightLabel)[0];
                var LineHeightSetBox = utils.getElement('#' + gui.controls.eleLineHeightControl)[0];
                var addButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightBtn)[0];
                var addMinusButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightMinusBtn)[0];              
                $(LineHeightSetBox).empty();
                LineHeightSetLabel.style.display = "none";
                LineHeightSetBox.style.display = "none";
                addButLineHeight.style.display = "none";
                addMinusButLineHeight.style.display = "none";                
                var WordSpaceSetLabel = utils.getElement('#' + gui.controls.cssWordSpaceLabel)[0];
                var WordSpaceSetBox = utils.getElement('#' + gui.controls.eleWordSpaceControl)[0];
                var addButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceBtn)[0];
                var addMinusButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceMinusBtn)[0];               
                $(WordSpaceSetBox).empty();
                WordSpaceSetLabel.style.display = "none";
                WordSpaceSetBox.style.display = "none";
                addButWordSpace.style.display = "none";
                addMinusButWordSpace.style.display = "none";              
                var LetSpaceSetLabel = utils.getElement('#' + gui.controls.cssLetSpaceLabel)[0]; 
                var LetSpaceSetBox = utils.getElement('#' + gui.controls.eleLetSpaceControl)[0]; 
                var addButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceBtn)[0];
                var addMinusButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceMinusBtn)[0];               
                $(LetSpaceSetBox).empty();
                LetSpaceSetLabel.style.display = "none";
                LetSpaceSetBox.style.display = "none";
                addButLetSpace.style.display = "none";
                addMinusButLetSpace.style.display = "none";
                var TextIndentSetLabel = utils.getElement('#' + gui.controls.cssTextIndentLabel)[0]; 
                var TextIndentSetBox = utils.getElement('#' + gui.controls.eleTextIndentControl)[0]; 
                var addButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentBtn)[0];
                var addMinusButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentMinusBtn)[0];               
                $(TextIndentSetBox).empty();
                TextIndentSetLabel.style.display = "none";
                TextIndentSetBox.style.display = "none";
                addButTextIndent.style.display = "none";
                addMinusButTextIndent.style.display = "none";              
                posInputLeft.disabled = false;
                addButLeft.disabled = false;
                addMinusButLeft.disabled = false;
                posInputTop.disabled = false;
                addButTop.disabled = false;
                addMinusButTop.disabled = false;
                posInputHeight.disabled = false;
                addButHeight.disabled = false;
                addMinusButHeight.disabled = false;
                posInputWidth.disabled = false;                
                addButWidth.disabled = false;
                addMinusButWidth.disabled = false;
                cssSetBox.disabled = false;
                topSetBox.innerHTML = 0;
                topSetBox.value = 0;
                leftSetBox.innerHTML = 0;
                leftSetBox.value = 0;
                heightSetBox.innerHTML = 0;
                heightSetBox.value = 0;
                widthSetBox.innerHTML = 0;
                widthSetBox.value = 0;

                for (e=0; e < numOptions; e++){
                    $(document.getElementsByName('tempName' + e)).css("background-color", "");
                    
                }
        		if (ele[sv].nodeName === "BR" || ele[sv] == "select") {
        		    posInputTop.disabled = true;
        		    addButTop.disabled = true;
                    console.log(addButTop);
        		    addMinusButTop.disabled = true;
        		    posInputLeft.disabled = true;
        		    addButLeft.disabled = true;
        		    addMinusButLeft.disabled = true;
        		    posInputHeight.disabled = true;
                    addButHeight.disabled = true;
                    addMinusButHeight.disabled = true;
        		    posInputWidth.disabled = true;
                    addButWidth.disabled = true;
                    addMinusButWidth.disabled = true;
                    cssSetBox.disabled = true;
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].value = "";
                    utils.getElement('#' + gui.controls.addCssLabel)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].value = "0px";
                    utils.getElement('#' + gui.controls.addCssApplyBtn)[0].style.display = "none";
        		}
                else{
                    var eletopVal = $(nameFound).css('top');
                    if (eletopVal == "auto") { 
                        var margTop = $(nameFound).css('margin-top');
                        if (margTop == "0px") { 
                            var elebotVal = $(nameFound).css('bottom');
                            if (elebotVal == "auto") { 
                                var margBot = $(nameFound).css('margin-bottom');
                                if (margBot == "0px") { 
                                    posInputTop.disabled = true;
                                    addButTop.disabled = true;
                                    addMinusButTop.disabled = true;
                                } else { 
                                    botSetLabel.innerHTML = "Bottom:";
                                    margBot = margBot.replace('px', '');
                                    topSetBox.innerHTML = margBot;
                                    topSetBox.value = margBot;
                                }
                            } else { 
                                botSetLabel.innerHTML = "Bottom:";
                                elebotVal = elebotVal.replace('px', '');
                                topSetBox.innerHTML = elebotVal;
                                topSetBox.value = elebotVal;
                            }
                        } else { 
                            botSetLabel.innerHTML = "Top:";
                            margTop = margTop.replace('px', '');
                            topSetBox.innerHTML = margTop;
                            topSetBox.value = margTop;
                        }
                    } else { 
                        botSetLabel.innerHTML = "Top:";
                        eletopVal = eletopVal.replace('px', '');
                        topSetBox.innerHTML = eletopVal;
                        topSetBox.value = eletopVal;
                    }
                   
                    var eleleftVal = $(nameFound).css('left');
                    if (eleleftVal == "auto") { 
                        var margLeft = $(nameFound).css('margin-left');
                        if (margLeft == "0px") {
                            var elerightVal = $(nameFound).css('right');
                            if (elerightVal == "auto") { 
                                var margRight = $(nameFound).css('margin-right');
                                if (margRight == "0px") { 
                                    posInputLeft.disabled = true;
                                    addButLeft.disabled = true;
                                    addMinusButLeft.disabled = true;
                                } else {
                                    leftSetLabel.innerHTML = "Right:";
                                    margRight = margRight.replace('px', '');
                                    leftSetBox.innerHTML = margRight;
                                    leftSetBox.value = margRight;
                                }

                            } else {
                                leftSetLabel.innerHTML = "Right:";
                                elerightVal = elerightVal.replace('px', '');
                                leftSetBox.innerHTML = elerightVal;
                                leftSetBox.value = elerightVal;
                            }
                        } else {
                            leftSetLabel.innerHTML = "Left:";
                            margLeft = margLeft.replace('px', '');
                            leftSetBox.innerHTML = margLeft;
                            leftSetBox.value = margLeft;
                        }
                    } else {
                        leftSetLabel.innerHTML = "Left:";
                        eleleftVal = eleleftVal.replace('px', '');
                        leftSetBox.innerHTML = eleleftVal;
                        leftSetBox.value = eleleftVal;
                    }

                    var eleheightVal = $(nameFound).css('height');
                    console.log(eleheightVal);
                    if (eleheightVal == "auto") { 
                        posInputHeight.disabled = true;
                        addButHeight.disabled = true;
                        addMinusButHeight.disabled = true;
                    } else { 
                        eleheightVal = eleheightVal.replace('px', '');
                        heightSetBox.innerHTML = eleheightVal;
                        heightSetBox.value = eleheightVal;
                    }

                    var elewidthVal = $(nameFound).css('width');
                    if (elewidthVal == "auto") { 
                        posInputWidth.disabled = true;
                        addButWidth.disabled = true;
                        addMinusButWidth.disabled = true;
                    } else { 
                        elewidthVal = elewidthVal.replace('px', '');
                        widthSetBox.innerHTML = elewidthVal;
                        widthSetBox.value = elewidthVal;
                    }
                    $(nameFound).css("background-color", "#A9A9A9");

                    cssOption = document.createElement('option');
                    $(cssSetBox).empty();
                    var elePadTopVal = $(nameFound).css('padding-top');
                    var elePadLeftVal = $(nameFound).css('padding-left');
                    var elePadBotVal = $(nameFound).css('padding-bottom');
                    var elePadRightVal = $(nameFound).css('padding-right');
                    var eleFontVal = $(nameFound).css('font-family');
                    var eleFontSizeVal = $(nameFound).css('font-size');
                    var eleTextIndentVal = $(nameFound).css('text-indent');
                    console.log(eleTextIndentVal);
                    var eleCss = [];
                    console.log(eleCss);
                    if (elePadBotVal != "0px" || elePadLeftVal != "0px" || elePadRightVal != "0px" || elePadTopVal != "0px"){
                        if(elePadTopVal != "0px"){
                            eleCss.push("Padding-Top");
                        }
                        if(elePadRightVal != "0px"){
                            eleCss.push("Padding-Right");
                        }
                        if(elePadBotVal != "0px"){
                            eleCss.push("Padding-Bottom");
                        }
                        if(elePadLeftVal != "0px"){
                            eleCss.push("Padding-Left");
                        }
                    }
                    if (eleFontVal != "auto" || eleFontSizeVal != "0px") {
                        eleCss.push("Font-Family");
                        eleCss.push("Font-Size");
                        eleCss.push("Line-Height");
                        eleCss.push("Word-spacing");
                        eleCss.push("Letter-spacing");
                    }
                    // if (eleTextIndentVal != "0px"){
                        eleCss.push("Text-Indent");
                    // }
                    eleCss.unshift("Select");
                    numCss = eleCss.length;
                    for (z=0; z < numCss; z++) {
                        cssOption = document.createElement('option');
                        console.log(z);
                        cssOption.value = z;
                        console.log(cssOption);
                        cssOption.innerHTML = eleCss[z];
                        (cssSetBox).appendChild(cssOption);
                    }
                    // console.log(nameFound);
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.addCssLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].value = "";
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].innerHTML = "";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].value = "";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].innerHTML = "";
                    var cssValFound = ('#' + gui.controls.addedCssStyle);
                    $(cssValFound).empty();
                    console.log(b);
                    for (var i = 0; i < b-1; i++) {
                        console.log(cssPropAddAll[i].cssNamevalname);
                        if ('tempName' +(sv) === cssPropAddAll[i].cssNamevalname){
                            utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "block";
                            utils.getElement('#' + gui.controls.addCssSaveBtn)[0].style.display = "block";
                            utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "block";
                            console.log(cssPropAddAll[i].cssCheckvalname)
                            onCheckaddedStyle = document.createElement('input');
                            onCheckaddedStyle.type = 'checkbox';
                            onCheckaddedStyle.id = 'onCheckaddedStyle' + (i+1);
                            onCheckaddedStyle.checked = (cssPropAddAll[i].cssCheckvalname);
                            onCheckaddedStyle.addEventListener('change', events.onCheckaddedStyleCheck);
                            (utils.getElement('#' + gui.controls.addedCssStyle)[0]).appendChild(onCheckaddedStyle);
                            var divStyle = $('<span>'+cssPropAddAll[i].cssTextvalname+ '=' +cssPropAddAll[i].cssStylevalname+'</span></br>');
                            divStyle.addClass('classStyle'+(i+1));   
                            divStyle.appendTo(utils.getElement('#' + gui.controls.addedCssStyle)[0]);
                        }
                        else{
                            var cssValFound = ('#' + gui.controls.addedCssStyle);
                            $(cssValFound).empty();
                            // $(cssValFound).css({display:'none'});
                            utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "none";
                            utils.getElement('#' + gui.controls.addCssSaveBtn)[0].style.display = "none";
                        }
                    }   
                }
            },

            searchSelControlChanged: function (e) {
                searchEle = [];
                searchEleNum = [];
                var searchSetBox = utils.getElement('#' + gui.controls.searchSelControl)[0];
                var searchText = searchSetBox.value; 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(searchText != ""){
                    eleSearchControlBox.style.display = "inline-block";
                    eleComboBox.style.display = "none";
                } 
                else{
                    eleSearchControlBox.style.display = "none";
                    eleComboBox.style.display = "inline-block";
                }  
                for (e=0; e < numOptions; e++){
                    $(document.getElementsByName('tempName' + e)).css("background-color", "");   
                }
                searchEle.unshift("select");
                searchEleNum.unshift("select");
                include(ele1, searchText);
                
                function include(arr, obj) {
                    for(var i=0; i<arr.length; i++) {
                        var classListArr;
                        classListArr = (arr[i].className);
                        idListArr = (arr[i].id);
                        if (classListArr.match(searchText) || idListArr.match(searchText)){
                            searchEleNum.push(i);
                            if(idListArr != "" && classListArr == ""){
                                searchEle.push(arr[i].nodeName+(" - ID: ")+idListArr);    
                            }
                            else if(idListArr == "" && classListArr != ""){
                                searchEle.push(arr[i].nodeName+(" - Class: ")+classListArr);    
                            }
                            else{
                                searchEle.push(arr[i].nodeName+(" - ID: ")+idListArr+(" - Class: ")+classListArr);    
                            }
                            numSearchOptions = searchEle.length;
                            var className = arr[i].className;
                            var idName = arr[i].id;
                        }
                    }

                    eleSearchControlBox.options.length = 0;
                    for(var j=0; j<numSearchOptions; j++){
                        anSearchOption = document.createElement('option');
                        anSearchOption.value = j;

                        if (j === 0) {

                            anSearchOption.innerHTML = searchEle[j];
                            
                        }
                        else{
                            anSearchOption.innerHTML = searchEle[j];
                        }
                        console.log(anSearchOption);
                        (eleSearchControlBox).appendChild(anSearchOption);
                    }
                }       
            },

            /*search combo box change*/

            searchElementChanged: function (e) { 
                numSearchOptions = ele.length;

                selectSearchVal = $('select[name="eleSearchControl"] option:selected').text();
        
                console.log(selectSearchVal);

                var svSearch = $('select[name="eleSearchControl"] option:selected').val(); 
                svSearch = searchEleNum[svSearch]+1;
                console.log(svSearch);
                var nameFound = document.getElementsByName('tempName' + (svSearch));
                
                var botSetLabel = utils.getElement('#' + gui.controls.eleTopLabel)[0]; 
                console.log(botSetLabel);
                var leftSetLabel = utils.getElement('#' + gui.controls.eleLeftLabel)[0]; 
                var topSetBox = utils.getElement('#' + gui.controls.elementTopPos)[0]; 
                var leftSetBox = utils.getElement('#' + gui.controls.eleLeftPos)[0]; 
                var heightSetBox = utils.getElement('#' + gui.controls.eleHeightPos)[0]; 
                var widthSetBox = utils.getElement('#' + gui.controls.eleWidthPos)[0];      
                var addButTop = utils.getElement('#' + gui.controls.eleTopBtn)[0]; 
                var addMinusButTop = utils.getElement('#' + gui.controls.eleTopMinusBtn)[0]; 
                var posInputTop = utils.getElement('#' + gui.controls.elementTopPos)[0]; 
                var posInputLeft = utils.getElement('#' + gui.controls.eleLeftPos)[0]; 
                var posInputHeight = utils.getElement('#' + gui.controls.eleHeightPos)[0]; 
                var posInputWidth = utils.getElement('#' + gui.controls.eleWidthPos)[0]; 
                
                var addButLeft = utils.getElement('#' + gui.controls.eleLeftBtn)[0]; 
                var addMinusButLeft = utils.getElement('#' + gui.controls.eleLeftMinusBtn)[0];
                var addButHeight = utils.getElement('#' + gui.controls.eleHeightBtn)[0]; 
                var addMinusButHeight = utils.getElement('#' + gui.controls.eleHeightMinusBtn)[0]; 
                var addButWidth = utils.getElement('#' + gui.controls.eleWidthBtn)[0];
                var addMinusButWidth = utils.getElement('#' + gui.controls.eleWidthMinusBtn)[0]; 
                var cssSetBox = utils.getElement('#' + gui.controls.cssControl)[0];
                var fontSetLabel = utils.getElement('#' + gui.controls.cssFontLabel)[0]; 
                var fontSetBox = utils.getElement('#' + gui.controls.cssFontControl)[0]; 
                fontSetLabel.style.display = "none";
                fontSetBox.style.display = "none";
                $(fontSetBox).empty();         
                var FontSizeSetLabel = utils.getElement('#' + gui.controls.cssFontSizeLabel)[0];
                var FontSizeSetBox = utils.getElement('#' + gui.controls.eleFontSizeControl)[0]; 
                var addButFontSize = utils.getElement('#' + gui.controls.eleFontSizeBtn)[0];
                var addMinusButFontSize = utils.getElement('#' + gui.controls.eleFontSizeMinusBtn)[0];
                $(FontSizeSetBox).empty();
                FontSizeSetLabel.style.display = "none";
                FontSizeSetBox.style.display = "none";
                addButFontSize.style.display = "none";
                addMinusButFontSize.style.display = "none";              
                var LineHeightSetLabel = utils.getElement('#' + gui.controls.cssLineHeightLabel)[0];
                var LineHeightSetBox = utils.getElement('#' + gui.controls.eleLineHeightControl)[0];
                var addButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightBtn)[0];
                var addMinusButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightMinusBtn)[0];              
                $(LineHeightSetBox).empty();
                LineHeightSetLabel.style.display = "none";
                LineHeightSetBox.style.display = "none";
                addButLineHeight.style.display = "none";
                addMinusButLineHeight.style.display = "none";                
                var WordSpaceSetLabel = utils.getElement('#' + gui.controls.cssWordSpaceLabel)[0];
                var WordSpaceSetBox = utils.getElement('#' + gui.controls.eleWordSpaceControl)[0];
                var addButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceBtn)[0];
                var addMinusButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceMinusBtn)[0];               
                $(WordSpaceSetBox).empty();
                WordSpaceSetLabel.style.display = "none";
                WordSpaceSetBox.style.display = "none";
                addButWordSpace.style.display = "none";
                addMinusButWordSpace.style.display = "none";              
                var LetSpaceSetLabel = utils.getElement('#' + gui.controls.cssLetSpaceLabel)[0]; 
                var LetSpaceSetBox = utils.getElement('#' + gui.controls.eleLetSpaceControl)[0]; 
                var addButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceBtn)[0];
                var addMinusButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceMinusBtn)[0];               
                $(LetSpaceSetBox).empty();
                LetSpaceSetLabel.style.display = "none";
                LetSpaceSetBox.style.display = "none";
                addButLetSpace.style.display = "none";
                addMinusButLetSpace.style.display = "none";  
                var TextIndentSetLabel = utils.getElement('#' + gui.controls.cssTextIndentLabel)[0]; 
                var TextIndentSetBox = utils.getElement('#' + gui.controls.eleTextIndentControl)[0]; 
                var addButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentBtn)[0];
                var addMinusButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentMinusBtn)[0];               
                $(TextIndentSetBox).empty();
                TextIndentSetLabel.style.display = "none";
                TextIndentSetBox.style.display = "none";
                addButTextIndent.style.display = "none";
                addMinusButTextIndent.style.display = "none";               
                posInputLeft.disabled = false;
                addButLeft.disabled = false;
                addMinusButLeft.disabled = false;
                posInputTop.disabled = false;
                addButTop.disabled = false;
                addMinusButTop.disabled = false;
                posInputHeight.disabled = false;
                addButHeight.disabled = false;
                addMinusButHeight.disabled = false;
                posInputWidth.disabled = false;                
                addButWidth.disabled = false;
                addMinusButWidth.disabled = false;
                topSetBox.innerHTML = 0;
                topSetBox.value = 0;
                leftSetBox.innerHTML = 0;
                leftSetBox.value = 0;
                heightSetBox.innerHTML = 0;
                heightSetBox.value = 0;
                widthSetBox.innerHTML = 0;
                widthSetBox.value = 0;

                for (e=0; e < numSearchOptions; e++){
                    $(document.getElementsByName('tempName' + e)).css("background-color", "");  
                }
                if (ele[svSearch] == "select") {
                    posInputTop.disabled = true;
                    addButTop.disabled = true;
                    console.log(addButTop);
                    addMinusButTop.disabled = true;
                    posInputLeft.disabled = true;
                    addButLeft.disabled = true;
                    addMinusButLeft.disabled = true;
                    posInputHeight.disabled = true;
                    addButHeight.disabled = true;
                    addMinusButHeight.disabled = true;
                    posInputWidth.disabled = true;
                    addButWidth.disabled = true;
                    addMinusButWidth.disabled = true;
                }
                else{
                    var eletopVal = $(nameFound).css('top');
                    if (eletopVal == "auto") { 
                        var margTop = $(nameFound).css('margin-top');
                        if (margTop == "0px") { 
                            var elebotVal = $(nameFound).css('bottom');
                            if (elebotVal == "auto") { 
                                var margBot = $(nameFound).css('margin-bottom');
                                if (margBot == "auto") { 
                                    posInputTop.disabled = true;
                                    addButTop.disabled = true;
                                    addMinusButTop.disabled = true;
                                } else { 
                                    botSetLabel.innerHTML = "Bottom:";
                                    margBot = margBot.replace('px', '');
                                    topSetBox.innerHTML = margBot;
                                    topSetBox.value = margBot;
                                }
                            } else { 
                                botSetLabel.innerHTML = "Bottom:";
                                elebotVal = elebotVal.replace('px', '');
                                topSetBox.innerHTML = elebotVal;
                                topSetBox.value = elebotVal;
                            }
                        } else { 
                            botSetLabel.innerHTML = "Top:";
                            margTop = margTop.replace('px', '');
                            topSetBox.innerHTML = margTop;
                            topSetBox.value = margTop;
                        }
                    } else { 
                        botSetLabel.innerHTML = "Top:";
                        eletopVal = eletopVal.replace('px', '');
                        topSetBox.innerHTML = eletopVal;
                        topSetBox.value = eletopVal;
                    }
                   
                    var eleleftVal = $(nameFound).css('left');
                    if (eleleftVal == "auto") { 
                        var margLeft = $(nameFound).css('margin-left');
                        if (margLeft == "0px") {

                            var elerightVal = $(nameFound).css('right');
                            if (elerightVal == "auto") { 
                                var margRight = $(nameFound).css('margin-right');
                                if (margRight == "0px") { 
                                    posInputLeft.disabled = true;
                                    addButLeft.disabled = true;
                                    addMinusButLeft.disabled = true;
                                } else {
                                    leftSetLabel.innerHTML = "Right:";
                                    margRight = margRight.replace('px', '');
                                    leftSetBox.innerHTML = margRight;
                                    leftSetBox.value = margRight;
                                }

                            } else {
                                leftSetLabel.innerHTML = "Right:";
                                elerightVal = elerightVal.replace('px', '');
                                leftSetBox.innerHTML = elerightVal;
                                leftSetBox.value = elerightVal;
                            }
                        } else {
                            leftSetLabel.innerHTML = "Left:";
                            margLeft = margLeft.replace('px', '');
                            leftSetBox.innerHTML = margLeft;
                            leftSetBox.value = margLeft;
                        }
                    } else {
                        leftSetLabel.innerHTML = "Left:";
                        eleleftVal = eleleftVal.replace('px', '');
                        leftSetBox.innerHTML = eleleftVal;
                        leftSetBox.value = eleleftVal;
                    }

                    var eleheightVal = $(nameFound).css('height');
                    if (eleheightVal == "auto") { 
                        posInputHeight.disabled = true;
                        addButHeight.disabled = true;
                        addMinusButHeight.disabled = true;
                    } else { 
                        eleheightVal = eleheightVal.replace('px', '');
                        heightSetBox.innerHTML = eleheightVal;
                        heightSetBox.value = eleheightVal;
                    }

                    var elewidthVal = $(nameFound).css('width');
                    if (elewidthVal == "auto") { 
                        posInputWidth.disabled = true;
                        addButWidth.disabled = true;
                        addMinusButWidth.disabled = true;
                    } else { 
                        elewidthVal = elewidthVal.replace('px', '');
                        widthSetBox.innerHTML = elewidthVal;
                        widthSetBox.value = elewidthVal;
                    }
                    $(nameFound).css("background-color", "#A9A9A9");

                    cssOption = document.createElement('option');
                    $(cssSetBox).empty();
                    var elePadTopVal = $(nameFound).css('padding-top');
                    var elePadLeftVal = $(nameFound).css('padding-left');
                    var elePadBotVal = $(nameFound).css('padding-bottom');
                    var elePadRightVal = $(nameFound).css('padding-right');
                    var eleFontVal = $(nameFound).css('font-family');
                    var eleFontSizeVal = $(nameFound).css('font-size');
                    var eleTextIndentVal = $(nameFound).css('text-indent');
                    var eleCss = [];
                    console.log(eleCss);
                    if (elePadBotVal != "0px" || elePadLeftVal != "0px" || elePadRightVal != "0px" || elePadTopVal != "0px"){
                        if(elePadTopVal != "0px"){
                            eleCss.push("Padding-Top");
                        }
                        if(elePadRightVal != "0px"){
                            eleCss.push("Padding-Right");
                        }
                        if(elePadBotVal != "0px"){
                            eleCss.push("Padding-Bottom");
                        }
                        if(elePadLeftVal != "0px"){
                            eleCss.push("Padding-Left");
                        }
                    }
                    if (eleFontVal != "auto" || eleFontSizeVal != "0px") {
                        eleCss.push("Font-Family");
                        eleCss.push("Font-Size");
                        eleCss.push("Line-Height");
                        eleCss.push("Word-spacing");
                        eleCss.push("Letter-spacing");
                    }
                    // if (eleTextIndentVal != "0px"){
                        eleCss.push("Text-Indent");
                    // }
                    eleCss.unshift("Select");
                    numCss = eleCss.length;
                    for (z=0; z < numCss; z++) {
                        cssOption = document.createElement('option');
                        console.log(z);
                        cssOption.value = z;
                        console.log(cssOption);
                        cssOption.innerHTML = eleCss[z];
                        (cssSetBox).appendChild(cssOption);
                    }
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.addCssLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].value = "";
                    utils.getElement('#' + gui.controls.cssPropertyText)[0].innerHTML = "";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].value = "";
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].innerHTML = "";
                    var cssValFound = ('#' + gui.controls.addedCssStyle);
                    $(cssValFound).empty();
                    console.log(b);
                    for (var i = 0; i < b-1; i++) {
                        console.log(cssPropAddAll[i].cssNamevalname);
                        if ('tempName' +(sv) === cssPropAddAll[i].cssNamevalname){
                            utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "block";
                            utils.getElement('#' + gui.controls.addCssSaveBtn)[0].style.display = "block";
                            utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "block";
                            console.log(cssPropAddAll[i].cssCheckvalname)
                            onCheckaddedStyle = document.createElement('input');
                            onCheckaddedStyle.type = 'checkbox';
                            onCheckaddedStyle.id = 'onCheckaddedStyle' + (i+1);
                            onCheckaddedStyle.checked = (cssPropAddAll[i].cssCheckvalname);
                            onCheckaddedStyle.addEventListener('change', events.onCheckaddedStyleCheck);
                            (utils.getElement('#' + gui.controls.addedCssStyle)[0]).appendChild(onCheckaddedStyle);
                            var divStyle = $('<span>'+cssPropAddAll[i].cssTextvalname+ '=' +cssPropAddAll[i].cssStylevalname+'</span></br>');
                            divStyle.addClass('classStyle'+(i+1));   
                            divStyle.appendTo(utils.getElement('#' + gui.controls.addedCssStyle)[0]);
                        }
                        else{
                            var cssValFound = ('#' + gui.controls.addedCssStyle);
                            $(cssValFound).empty();
                            // $(cssValFound).css({display:'none'});
                            utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "none";
                            utils.getElement('#' + gui.controls.addCssSaveBtn)[0].style.display = "none";
                        }
                    }  
                }    
            },

            /*search combo box ends*/

            elementTopChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var topSetBox = utils.getElement('#' + gui.controls.elementTopPos)[0];
                var addButTop = utils.getElement('#' + gui.controls.eleTopBtn)[0];
                var addMinusButTop = utils.getElement('#' + gui.controls.eleTopMinusBtn)[0];
                addButTop.disabled = false;
                addMinusButTop.disabled = false;
                console.log(nameFound, topSetBox);
                var eletopVal = $(nameFound).css('top');
                var margTop = $(nameFound).css('margin-top');
                var margBot = $(nameFound).css('margin-bottom');
                var elebotVal = $(nameFound).css('bottom');

                topPos = ($('input[name="topPosElement"]').val());

                if (eletopVal == "auto") {
                    if (margTop == "0px") {
                        if (elebotVal == "auto") {
                            if (margBot == "0px") {
                                $(nameFound).css("margin-top", topPos + "px");
                            }
                            else {
            				    $(nameFound).css("margin-bottom", topPos + "px");
            			    }
                        }
                    }
                }

                if (eletopVal == "auto") {
                    if (margTop == "0px") {
                        if (margBot == "0px") {
                            if (elebotVal == "auto") {
                                $(nameFound).css("margin-top", topPos + "px");
                            }
                            else {
            				    $(nameFound).css("bottom", topPos + "px");
            			    }
                        }
                    }
                }

                if (eletopVal == "auto") {
                    if (margBot == "0px") {
                        if (elebotVal == "auto") {
                            if (margTop == "0px") {
                                $(nameFound).css("margin-top", topPos + "px");
                            }
                            else {
            				    $(nameFound).css("margin-top", topPos + "px");
            			    }
                        }
                    }
                }

                if (elebotVal == "auto") {
                    if (margTop == "0px") {
                        if (margBot == "0px") {
                            if (eletopVal == "auto") {
                                $(nameFound).css("margin-top", topPos + "px");
                            }
                            else {
            				    $(nameFound).css("top", topPos + "px");
            			    }
                        }
                    }
                }

            },

            eleTopBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));

                var eletopVal = $(nameFound).css('top');
                var margTop = $(nameFound).css('margin-top');
                var margBot = $(nameFound).css('margin-bottom');
                var elebotVal = $(nameFound).css('bottom');

                topPos = ($('input[name="topPosElement"]').val());
                topPos++;
                var topSetBox = utils.getElement('#' + gui.controls.elementTopPos)[0];
                topSetBox.innerHTML = topPos;
                topSetBox.value = topPos;
                console.log(topSetBox.value);
                console.log(eletopVal);
                var posInputTop = utils.getElement('#' + gui.controls.elementTopPos)[0]; 
                var addButTop = utils.getElement('#' + gui.controls.eleTopBtn)[0]; 
                var addMinusButTop = utils.getElement('#' + gui.controls.eleTopMinusBtn)[0]; 

                if (posInputTop.disabled == true) {
                    topSetBox.innerHTML = "0";
                    topSetBox.value = 0;
                    topPos--;
                }
                
                if (eletopVal == "auto") {
                    if (margTop == "0px") {
                        if (elebotVal == "auto") {
            			    if (margBot == "0px") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                				$(nameFound).css("margin-bottom", topPos + "px");
                                $(nameFound).css("background-color", "");
            			    }
                        }
                    }
                }

                if (eletopVal == "auto") {
                    if (margTop == "0px") {
                        if (margBot == "0px") {
            			    if (elebotVal == "auto") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                				$(nameFound).css("bottom", topPos + "px");
                                $(nameFound).css("background-color", "");
            			    }
                        }
                    }
                }

                if (eletopVal == "auto") {
                    if (margBot == "0px") {
                        if (elebotVal == "auto") {
            			    if (margTop == "0px") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                				$(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
            			    }
                        }
                    }
                }

                if (elebotVal == "auto") {
                    if (margTop == "0px") {
                        if (margBot == "0px") {
            			    if (eletopVal == "auto") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                				$(nameFound).css("top", topPos + "px");
                                $(nameFound).css("background-color", "");
            			    }
                        }
                    }
                }

            },

            eleTopMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 

                var eletopVal = $(nameFound).css('top');
                var margTop = $(nameFound).css('margin-top');
                var margBot = $(nameFound).css('margin-bottom');
                var elebotVal = $(nameFound).css('bottom');
                topPos = ($('input[name="topPosElement"]').val());
                topPos--;
                var topSetBox = utils.getElement('#' + gui.controls.elementTopPos)[0];
                topSetBox.innerHTML = topPos;
                topSetBox.value = topPos;
                var posInputTop = utils.getElement('#' + gui.controls.elementTopPos)[0]; 
                
                if (posInputTop.disabled == true) {
                   topSetBox.innerHTML = "0";
                   topSetBox.value = 0;
                   topPos++;
               }
                if (eletopVal == "auto") {
                    if (margTop == "0px") {
                        if (elebotVal == "auto") {
                            if (margBot == "0px") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("margin-bottom", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

                if (eletopVal == "auto") {
                    if (margTop == "0px") {
                        if (margBot == "0px") {
                            if (elebotVal == "auto") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("bottom", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

                if (eletopVal == "auto") {
                    if (margBot == "0px") {
                        if (elebotVal == "auto") {
                            if (margTop == "0px") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

                if (elebotVal == "auto") {
                    if (margTop == "0px") {
                        if (margBot == "0px") {
                            if (eletopVal == "auto") {
                                $(nameFound).css("margin-top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("top", topPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

            },

            elementLeftChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var leftSetBox = utils.getElement('#' + gui.controls.eleLeftPos)[0];

                var eleleftVal = $(nameFound).css('left');
                var margLeft = $(nameFound).css('margin-left');

                var margRight = $(nameFound).css('margin-right');
                var elerightVal = $(nameFound).css('right');

                leftPos = ($('input[name="leftPosElement"]').val());
		
                var addButLeft = utils.getElement('#' + gui.controls.eleLeftBtn)[0]; 
                var addMinusButLeft = utils.getElement('#' + gui.controls.eleLeftMinusBtn)[0]; 
                
                addButLeft.disabled = false;
                addMinusButLeft.disabled = false;

                if (eleleftVal == "auto") {
                    if (margLeft == "0px") {
                        if (elerightVal == "auto") {
                            if (margRight == "0px") {
                                $(nameFound).css("margin-left", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("margin-right", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

                if (eleleftVal == "auto") {
                    if (margLeft == "0px") {
                        if (margRight == "0px") {
                            if (elerightVal == "auto") {
                                $(nameFound).css("margin-left", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("right", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

                if (eleleftVal == "auto") {
                    if (margRight == "0px") {
                        if (elerightVal == "auto") {
                            if (margLeft == "0px") {
                                $(nameFound).css("margin-left", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("margin-left", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

                if (elerightVal == "auto") {
                    if (margLeft == "0px") {
                        if (margRight == "0px") {
                            if (eleleftVal == "auto") {
                                $(nameFound).css("margin-left", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                            else {
                                $(nameFound).css("left", leftPos + "px");
                                $(nameFound).css("background-color", "");
                            }
                        }
                    }
                }

            },

            eleLeftBtnClicked: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));

                var eleleftVal = $(nameFound).css('left');
                var margLeft = $(nameFound).css('margin-left');
                var margRight = $(nameFound).css('margin-right');
                var elerightVal = $(nameFound).css('right');

                leftPos = ($('input[name="leftPosElement"]').val());
                leftPos++;
                var leftSetBox = utils.getElement('#' + gui.controls.eleLeftPos)[0];
                leftSetBox.innerHTML = leftPos;
                leftSetBox.value = leftPos;
                var posInputLeft = utils.getElement('#' + gui.controls.eleLeftPos)[0];
                
                if (posInputLeft.disabled == true) {
                   leftSetBox.innerHTML = "0";
                   leftSetBox.value = 0;
                   leftPos--;
               }
               
                if (eleleftVal == "auto") {
                    if (margLeft == "0px") {
                        if (elerightVal == "auto") {

                            $(nameFound).css("margin-right", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

                if (eleleftVal == "auto") {
                    if (margLeft == "0px") {
                        if (margRight == "0px") {
                            $(nameFound).css("right", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

                if (eleleftVal == "auto") {
                    if (margRight == "0px") {
                        if (elerightVal == "auto") {
                            $(nameFound).css("margin-left", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

                if (elerightVal == "auto") {
                    if (margLeft == "0px") {
                        if (margRight == "0px") {
                            $(nameFound).css("left", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }


            },

            eleLeftMinusBtnClicked: function (e) {

                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 

                var eleleftVal = $(nameFound).css('left');
                var margLeft = $(nameFound).css('margin-left');
                var margRight = $(nameFound).css('margin-right');
                var elerightVal = $(nameFound).css('right');

                leftPos = ($('input[name="leftPosElement"]').val());
                leftPos--;
                var leftSetBox = utils.getElement('#' + gui.controls.eleLeftPos)[0];

                leftSetBox.innerHTML = leftPos;
                leftSetBox.value = leftPos;
                
                var posInputLeft = utils.getElement('#' + gui.controls.eleLeftPos)[0]; 
                if (posInputLeft.disabled == true) {
                   leftSetBox.innerHTML = "0";
                   leftSetBox.value = 0;
                   leftPos++;
               }

                if (eleleftVal == "auto") {
                    if (margLeft == "0px") {
                        if (elerightVal == "auto") {

                            $(nameFound).css("margin-right", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

                if (eleleftVal == "auto") {
                    if (margLeft == "0px") {
                        if (margRight == "0px") {
                            $(nameFound).css("right", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

                if (eleleftVal == "auto") {
                    if (margRight == "0px") {
                        if (elerightVal == "auto") {
                            $(nameFound).css("margin-left", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

                if (elerightVal == "auto") {
                    if (margLeft == "0px") {
                        if (margRight == "0px") {
                            $(nameFound).css("left", leftPos + "px");
                            $(nameFound).css("background-color", "");
                        }
                    }
                }

            },

            elementHeightChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var heightSetBox = utils.getElement('#' + gui.controls.eleHeightPos)[0];

                var eleheightVal = $(nameFound).css('height');

                heightPos = ($('input[name="heightPosElement"]').val());

                var addButHeight = utils.getElement('#' + gui.controls.eleHeightBtn)[0]; 
                var addMinusButHeight = utils.getElement('#' + gui.controls.eleHeightMinusBtn)[0]; 
                
                addButHeight.disabled = false;
                addMinusButHeight.disabled = false;

                if (eleheightVal == "auto") { 	    
                    addButHeight.disabled = true;
                    addMinusButHeight.disabled = true;
                    heightSetBox.disabled = true;
                } else { 
                    $(nameFound).css("height", heightPos + "px");
                    $(nameFound).css("background-color", "");
                }
            },

            eleHeightBtnClicked: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));

                var eleheightVal = $(nameFound).css('height');

                heightPos = ($('input[name="heightPosElement"]').val());
                heightPos++;
                var posInputHeight = utils.getElement('#' + gui.controls.eleHeightPos)[0];
                
                if (posInputHeight.disabled == true) {
                   heightSetBox.innerHTML = "0";
                   heightSetBox.value = 0;
                   heightPos--;
                }
                var heightSetBox = utils.getElement('#' + gui.controls.eleHeightPos)[0];
                heightSetBox.innerHTML = heightPos;
                heightSetBox.value = heightPos;

                $(nameFound).css("height", heightPos + "px");
                $(nameFound).css("background-color", "");
            },

            eleHeightMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 

                var eleheightVal = $(nameFound).css('height');

                heightPos = ($('input[name="heightPosElement"]').val());
                heightPos--;
                var posInputHeight = utils.getElement('#' + gui.controls.eleHeightPos)[0];
                
                if (posInputHeight.disabled == true) {
                   heightSetBox.innerHTML = "0";
                   heightSetBox.value = 0;
                   heightPos++;
                } 
                var heightSetBox = utils.getElement('#' + gui.controls.eleHeightPos)[0];
                heightSetBox.innerHTML = heightPos;
                heightSetBox.value = heightPos;

                $(nameFound).css("height", heightPos + "px");
                $(nameFound).css("background-color", "");
            },

            elementWidthChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var widthSetBox = utils.getElement('#' + gui.controls.eleWidthPos)[0];

                var elewidthVal = $(nameFound).css('width');

                widthPos = ($('input[name="widthPosElement"]').val());

                var addButWidth = utils.getElement('#' + gui.controls.eleWidthBtn)[0]; 
                var addMinusButWidth = utils.getElement('#' + gui.controls.eleWidthMinusBtn)[0]; 
                
                addButWidth.disabled = false;
                addMinusButWidth.disabled = false;
		
                if (elewidthVal == "auto") { 	    
                    addButWidth.disabled = true;
                    addMinusButWidth.disabled = true;
                    widthSetBox.disabled = true;
                } else { 

                    $(nameFound).css("width", widthPos + "px");
                    $(nameFound).css("background-color", "");
                }
            },

            eleWidthBtnClicked: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));

                var elewidthVal = $(nameFound).css('width');

                widthPos = ($('input[name="widthPosElement"]').val());
                widthPos++;
                var posInputWidth = utils.getElement('#' + gui.controls.eleWidthPos)[0]; 
                
                if (posInputWidth.disabled == true) {
                   widthSetBox.innerHTML = "0";
                   widthSetBox.value = 0;
                   widthPos--;
               }     
                var widthSetBox = utils.getElement('#' + gui.controls.eleWidthPos)[0];
                widthSetBox.innerHTML = widthPos;
                widthSetBox.value = widthPos;

                $(nameFound).css("width", widthPos + "px");
                $(nameFound).css("background-color", "");
            },

            eleWidthMinusBtnClicked: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));

                var elewidthVal = $(nameFound).css('width');

                widthPos = ($('input[name="widthPosElement"]').val());
                widthPos--;
                var posInputWidth = utils.getElement('#' + gui.controls.eleWidthPos)[0];
                
                if (posInputWidth.disabled == true) {
                   widthSetBox.innerHTML = "0";
                   widthSetBox.value = 0;
                   widthPos++;
                }
                var widthSetBox = utils.getElement('#' + gui.controls.eleWidthPos)[0];
                widthSetBox.innerHTML = widthPos;
                widthSetBox.value = widthPos;

                $(nameFound).css("width", widthPos + "px");
                $(nameFound).css("background-color", "");
            },
            
            cssElementChanged: function (e) {
                
                var padSetLabel = utils.getElement('#' + gui.controls.cssPadLabel)[0];
                var padSetBox = utils.getElement('#' + gui.controls.elePaddingControl)[0];
                var addButPad = utils.getElement('#' + gui.controls.elePadBtn)[0];
                var addMinusButPad = utils.getElement('#' + gui.controls.elePadMinusBtn)[0];                
                var fontSetLabel = utils.getElement('#' + gui.controls.cssFontLabel)[0]; 
                var fontSetBox = utils.getElement('#' + gui.controls.cssFontControl)[0];                
                var FontSizeSetLabel = utils.getElement('#' + gui.controls.cssFontSizeLabel)[0];
                var FontSizeSetBox = utils.getElement('#' + gui.controls.eleFontSizeControl)[0]; 
                var addButFontSize = utils.getElement('#' + gui.controls.eleFontSizeBtn)[0]; 
                var addMinusButFontSize = utils.getElement('#' + gui.controls.eleFontSizeMinusBtn)[0];                
                var LineHeightSetLabel = utils.getElement('#' + gui.controls.cssLineHeightLabel)[0]; 
                var LineHeightSetBox = utils.getElement('#' + gui.controls.eleLineHeightControl)[0]; 
                var addButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightBtn)[0]; 
                var addMinusButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightMinusBtn)[0];                
                var WordSpaceSetLabel = utils.getElement('#' + gui.controls.cssWordSpaceLabel)[0]; 
                var WordSpaceSetBox = utils.getElement('#' + gui.controls.eleWordSpaceControl)[0]; 
                var addButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceBtn)[0]; 
                var addMinusButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceMinusBtn)[0];                
                var LetSpaceSetLabel = utils.getElement('#' + gui.controls.cssLetSpaceLabel)[0]; 
                var LetSpaceSetBox = utils.getElement('#' + gui.controls.eleLetSpaceControl)[0]; 
                var addButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceBtn)[0]; 
                var addMinusButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceMinusBtn)[0]; 
                var TextIndentSetLabel = utils.getElement('#' + gui.controls.cssTextIndentLabel)[0]; 
                var TextIndentSetBox = utils.getElement('#' + gui.controls.eleTextIndentControl)[0]; 
                var addButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentBtn)[0]; 
                var addMinusButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentMinusBtn)[0]; 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                function displayPaddingItems() {
                    padSetLabel.style.display = "inline";
                    padSetBox.style.display = "inline";
                    addButPad.style.display = "block";
                    addMinusButPad.style.display = "block";
                    hideFontItems();
                    hideFontSizeItems();
                    hideLineHeightItems();
                    hideWordSpaceItems();
                    hideLetSpaceItems();
                    hideTextIndentItems();
                };
                function hidePaddingItems() {
                    padSetLabel.style.display = "none";
                    padSetBox.style.display = "none";
                    addButPad.style.display = "none";
                    addMinusButPad.style.display = "none";
                };
                function displayFontItems() {
                    fontSetLabel.style.display = "inline";
                    fontSetBox.style.display = "inline";
                    hidePaddingItems();
                    hideFontSizeItems();
                    hideLineHeightItems();
                    hideWordSpaceItems();
                    hideLetSpaceItems();
                    hideTextIndentItems()
                };
                function hideFontItems() {
                    fontSetLabel.style.display = "none";
                    fontSetBox.style.display = "none";
                };
                function displayFontSizeItems() {
                    FontSizeSetLabel.style.display = "inline";
                    FontSizeSetBox.style.display = "inline";
                    addButFontSize.style.display = "block";
                    addMinusButFontSize.style.display = "block";
                    hidePaddingItems();
                    hideFontItems();
                    hideLineHeightItems();
                    hideWordSpaceItems();
                    hideLetSpaceItems();
                    hideTextIndentItems()
                };
                function hideFontSizeItems() {
                    FontSizeSetLabel.style.display = "none";
                    FontSizeSetBox.style.display = "none";
                    addButFontSize.style.display = "none";
                    addMinusButFontSize.style.display = "none";
                };
                function displayLineHeightItems() {
                    LineHeightSetLabel.style.display = "inline";
                    LineHeightSetBox.style.display = "inline";
                    addButLineHeight.style.display = "block";
                    addMinusButLineHeight.style.display = "block";
                    hidePaddingItems();
                    hideFontItems();
                    hideFontSizeItems();
                    hideWordSpaceItems();
                    hideLetSpaceItems();
                    hideTextIndentItems()
                };
                function hideLineHeightItems() {
                    LineHeightSetLabel.style.display = "none";
                    LineHeightSetBox.style.display = "none";
                    addButLineHeight.style.display = "none";
                    addMinusButLineHeight.style.display = "none";
                };
                function displayWordSpaceItems() {
                    WordSpaceSetLabel.style.display = "inline";
                    WordSpaceSetBox.style.display = "inline";
                    addButWordSpace.style.display = "block";
                    addMinusButWordSpace.style.display = "block";
                    hidePaddingItems();
                    hideFontItems();
                    hideFontSizeItems();
                    hideLineHeightItems();
                    hideLetSpaceItems();
                    hideTextIndentItems()
                };
                function hideWordSpaceItems() {
                    WordSpaceSetLabel.style.display = "none";
                    WordSpaceSetBox.style.display = "none";
                    addButWordSpace.style.display = "none";
                    addMinusButWordSpace.style.display = "none";
                };
                function displayLetSpaceItems() {
                    LetSpaceSetLabel.style.display = "inline";
                    LetSpaceSetBox.style.display = "inline";
                    addButLetSpace.style.display = "block";
                    addMinusButLetSpace.style.display = "block";
                    hidePaddingItems();
                    hideFontItems();
                    hideFontSizeItems();
                    hideLineHeightItems();
                    hideWordSpaceItems();
                    hideTextIndentItems()
                };
                function hideLetSpaceItems() {
                    LetSpaceSetLabel.style.display = "none";
                    LetSpaceSetBox.style.display = "none";
                    addButLetSpace.style.display = "none";
                    addMinusButLetSpace.style.display = "none";
                };
                function displayTextIndentItems() {
                    TextIndentSetLabel.style.display = "inline";
                    TextIndentSetBox.style.display = "inline";
                    addButTextIndent.style.display = "block";
                    addMinusButTextIndent.style.display = "block";
                    hidePaddingItems();
                    hideFontItems();
                    hideFontSizeItems();
                    hideLineHeightItems();
                    hideWordSpaceItems();
                    hideLetSpaceItems();
                };
                function hideTextIndentItems() {
                    TextIndentSetLabel.style.display = "none";
                    TextIndentSetBox.style.display = "none";
                    addButTextIndent.style.display = "none";
                    addMinusButTextIndent.style.display = "none";
                };
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                if (selectCssVal === "Select") {
                    hidePaddingItems();
                    hideFontItems();
                    hideFontSizeItems();
                    hideLineHeightItems();
                    hideWordSpaceItems();
                    hideLetSpaceItems();
                    hideTextIndentItems();
                }
                if (selectCssVal === "Padding-Top") {
                    displayPaddingItems();
                    
                    var y = 0;
                }
                if (selectCssVal === "Padding-Right") {
                    displayPaddingItems();
                    var y = 1;
                }
                if (selectCssVal === "Padding-Bottom") {
                    displayPaddingItems();
                    var y = 2;
                }
                if (selectCssVal === "Padding-Left") {
                    displayPaddingItems();
                    var y = 3;
                }
                switch (y) {
                    case 0:
                        padSetLabel.innerHTML = "Padding-Top";
                        var elePadTopVal = $(nameFound).css('padding-top');
                        elePadTopVal = elePadTopVal.replace('px', '');
                        padSetBox.innerHTML = elePadTopVal;
                        padSetBox.value = elePadTopVal;
                        break;
                
                    case 1:
                        padSetLabel.innerHTML = "Padding-Right";
                        var elePadRightVal = $(nameFound).css('padding-right');
                        elePadRightVal = elePadRightVal.replace('px', '');
                        padSetBox.innerHTML = elePadRightVal;
                        padSetBox.value = elePadRightVal;
                        break;
                    
                    case 2:
                        padSetLabel.innerHTML = "Padding-Bottom";
                        var elePadBottomVal = $(nameFound).css('padding-bottom');
                        elePadBottomVal = elePadBottomVal.replace('px', '');
                        padSetBox.innerHTML = elePadBottomVal;
                        padSetBox.value = elePadBottomVal;
                        break;
                    
                    case 3:
                        padSetLabel.innerHTML = "Padding-Left";
                        var elePadLeftVal = $(nameFound).css('padding-left');
                        elePadLeftVal = elePadLeftVal.replace('px', '');
                        padSetBox.innerHTML = elePadLeftVal;
                        padSetBox.value = elePadLeftVal;
                        break;
                }
                
                cssFontOption = document.createElement('option');
                $(fontSetBox).empty();
                var z = 0;
                var eleFontVal = $(nameFound).css('font-family');
                var eleFontSizeVal = $(nameFound).css('font-size');
                var eleFontCss = [];

                if (selectCssVal === "Font-Family") {
                    displayFontItems();
                }
                eleFontCss.unshift(eleFontVal);
                eleFontCss.push("Helvetica",
                                "Helvetica-Bold",
                                "Helvetica-BoldOblique",
                                "Helvetica-Light",
                                "Helvetica-LightOblique",
                                "Helvetica-Oblique",
                                "HelveticaNeue",
                                "HelveticaNeue-Bold",
                                "HelveticaNeue-CondensedBlack",
                                "HelveticaNeue-CondensedBold",
                                "HelveticaNeue-Italic",
                                "HelveticaNeue-Light",
                                "HelveticaNeue-LightItalic",
                                "HelveticaNeue-Medium",
                                "HelveticaNeue-UltraLight",
                                "HelveticaNeue-UltraLightItalic",
                                "Avenir-black",
                                "Avenir-BlackOblique",
                                "Avenir-Book",
                                "Avenir-BookOblique",
                                "Avenir-Heavy",
                                "Avenir-HeavyOblique",
                                "Avenir-Light",
                                "Avenir-LightOblique",
                                "Avenir-Medium",
                                "Avenir-MediumOblique",
                                "Avenir-Oblique",
                                "Avenir-Roman",
                                "AvenirNext-Bold",
                                "AvenirNext-BoldItalic",
                                "AvenirNext-DemiBold",
                                "AvenirNext-DemiBoldItalic",
                                "AvenirNext-Heavy",
                                "AvenirNext-HeavyItalic",
                                "AvenirNext-Italic",
                                "AvenirNext-Medium",
                                "AvenirNext-MediumItalic",
                                "AvenirNext-Regular",
                                "AvenirNext-UltraLight",
                                "AvenirNext-UltraLightItalic",
                                "AvenirNextCondensed-Bold",
                                "AvenirNextCondensed-BoldItalic",
                                "AvenirNextCondensed-DemiBold",
                                "AvenirNextCondensed-DemiBoldItalic",
                                "AvenirNextCondensed-Heavy",
                                "AvenirNextCondensed-HeavyItalic",
                                "AvenirNextCondensed-Italic",
                                "AvenirNextCondensed-Medium",
                                "AvenirNextCondensed-MediumItalic",
                                "AvenirNextCondensed-Regular",
                                "AvenirNextCondensed-UltraLight",
                                "AvenirNextCondensed-UltraLightItalic"
                                )
                
                cssFontOption = document.createElement('option');
                cssFontOption.value = 0;
                cssFontOption.innerHTML = eleFontCss[0];
                (fontSetBox).appendChild(cssFontOption);
                
                for (i=1; i < eleFontCss.length; i++) {
                    if (eleFontCss[i] === eleFontVal) {
                        console.log("duplicate found");
                    }
                    else{
                        addFonts(z,i);
                        console.log("found new")
                        z++;
                        console.log(i,z,eleFontCss.length);
                    }
                }
                function addFonts(z,i) {
                    cssFontOption = document.createElement('option');
                    cssFontOption.value = z;
                    cssFontOption.innerHTML = eleFontCss[i];
                    (fontSetBox).appendChild(cssFontOption);
                }
                
                if (selectCssVal === "Font-Size") {
                    displayFontSizeItems();
                    var eleFontSizeVal = $(nameFound).css('font-size');
                    eleFontSizeVal = eleFontSizeVal.replace('px', '');
                    FontSizeSetBox.innerHTML = eleFontSizeVal;
                    FontSizeSetBox.value = eleFontSizeVal;
                }
                
                if (selectCssVal === "Line-Height") {
                    displayLineHeightItems();
                    var eleLineHeightVal = $(nameFound).css('line-height');
                    eleLineHeightVal = eleLineHeightVal.replace('px', '');
                    LineHeightSetBox.innerHTML = eleLineHeightVal;
                    LineHeightSetBox.value = eleLineHeightVal;
                }
                
                if (selectCssVal === "Word-spacing") {
                    displayWordSpaceItems();
                    var eleWordSpaceVal = $(nameFound).css('word-spacing');
                    eleWordSpaceVal = eleWordSpaceVal.replace('px', '');
                    WordSpaceSetBox.innerHTML = eleWordSpaceVal;
                    WordSpaceSetBox.value = eleWordSpaceVal;
                }
                
                if (selectCssVal === "Letter-spacing") {
                    displayLetSpaceItems();
                    var eleLetSpaceVal = $(nameFound).css('letter-spacing');
                    eleLetSpaceVal = eleLetSpaceVal.replace('px', '');
                    LetSpaceSetBox.innerHTML = eleLetSpaceVal;
                    LetSpaceSetBox.value = eleLetSpaceVal;
                }

                if (selectCssVal === "Text-Indent") {
                    displayTextIndentItems();
                    var eleTextIndentVal = $(nameFound).css('text-indent');
                    eleTextIndentVal = eleTextIndentVal.replace('px', '');
                    TextIndentSetBox.innerHTML = eleTextIndentVal;
                    TextIndentSetBox.value = eleTextIndentVal;
                }
            },

            elementPadChanged: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var padSetBox = utils.getElement('#' + gui.controls.elePaddingControl)[0];
                padPos = ($('input[name="elePaddingControl"]').val());           
                if (selectCssVal === "Padding-Top") {
                    var y = 0;
                }
                if (selectCssVal === "Padding-Right") {
                    var y = 1;
                }
                if (selectCssVal === "Padding-Bottom") {
                    var y = 2;
                }
                if (selectCssVal === "Padding-Left") {
                    var y = 3;
                }
                switch (y) {
                    case 0:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-top", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 1:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-right", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 2:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-bottom", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 3:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-left", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                }
            },

            elePadBtnClicked: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var padSetBox = utils.getElement('#' + gui.controls.elePaddingControl)[0];
                padPos = ($('input[name="elePaddingControl"]').val());
                padPos++;
                
                var elePadVal = $(nameFound).css('padding-top');
                
                if (selectCssVal === "Padding-Top") {
                    var y = 0;
                }
                if (selectCssVal === "Padding-Right") {
                    var y = 1;
                }
                if (selectCssVal === "Padding-Bottom") {
                    var y = 2;
                }
                if (selectCssVal === "Padding-Left") {
                    var y = 3;
                }
                switch (y) {
                    case 0:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-top", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 1:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-right", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 2:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-bottom", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 3:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-left", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                }
            },

            elePadMinusBtnClicked: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var padSetBox = utils.getElement('#' + gui.controls.elePaddingControl)[0]; 
                padPos = ($('input[name="elePaddingControl"]').val());
                padPos--;
                
                var elePadVal = $(nameFound).css('padding-top');
                
                if (selectCssVal === "Padding-Top") {
                    var y = 0;
                }
                if (selectCssVal === "Padding-Right") {
                    var y = 1;
                }
                if (selectCssVal === "Padding-Bottom") {
                    var y = 2;
                }
                if (selectCssVal === "Padding-Left") {
                    var y = 3;
                }
                switch (y) {
                    case 0:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-top", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 1:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-right", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 2:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-bottom", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                    
                    case 3:
                        padSetBox.innerHTML = padPos;
                        padSetBox.value = padPos;
                        $(nameFound).css("padding-left", padPos + "px");
                        $(nameFound).css("background-color", "");
                        break;
                }

            },
            cssFontElementChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssFontVal = $('select[name="cssFontControl"] option:selected').text();
                $(nameFound).css("font-family", selectCssFontVal);
                $(nameFound).css("background-color", "");
            },
            
            elementFontSizeChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv));
                var FontSizeSetBox = utils.getElement('#' + gui.controls.eleFontSizeControl)[0];
                var eleFontSizeVal = $(nameFound).css('font-size');
                FontSizePos = ($('input[name="eleFontSizeControl"]').val());
                var addButFontSize = utils.getElement('#' + gui.controls.eleFontSizeBtn)[0]; 
                var addMinusButFontSize = utils.getElement('#' + gui.controls.eleFontSizeMinusBtn)[0];               
                addButFontSize.disabled = false;
                addMinusButFontSize.disabled = false;
                $(nameFound).css("font-size", FontSizePos + "px");
                $(nameFound).css("background-color", "");
            },

            eleFontSizeBtnClicked: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var FontSizeSetBox = utils.getElement('#' + gui.controls.eleFontSizeControl)[0]; 
                FontSizePos = ($('input[name="eleFontSizeControl"]').val());
                FontSizePos++;               
                var eleFontSizeVal = $(nameFound).css('font-size');
                FontSizeSetBox.innerHTML = FontSizePos;
                FontSizeSetBox.value = FontSizePos;
                $(nameFound).css("font-size", FontSizePos + "px");
                $(nameFound).css("background-color", "");
            },

            eleFontSizeMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var FontSizeSetBox = utils.getElement('#' + gui.controls.eleFontSizeControl)[0]; 
                FontSizePos = ($('input[name="eleFontSizeControl"]').val());
                FontSizePos--;                
                var eleFontSizeVal = $(nameFound).css('font-size');
                FontSizeSetBox.innerHTML = FontSizePos;
                FontSizeSetBox.value = FontSizePos;
                $(nameFound).css("font-size", FontSizePos + "px");
                $(nameFound).css("background-color", "");
            },
            
            elementLineHeightChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var LineHeightSetBox = utils.getElement('#' + gui.controls.eleLineHeightControl)[0];
                var eleLineHeightVal = $(nameFound).css('line-height');
                LineHeightPos = ($('input[name="eleLineHeightControl"]').val());
                var addButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightBtn)[0]; 
                var addMinusButLineHeight = utils.getElement('#' + gui.controls.eleLineHeightMinusBtn)[0];                
                addButLineHeight.disabled = false;
                addMinusButLineHeight.disabled = false;        
                $(nameFound).css("line-height", LineHeightPos + "px");
                $(nameFound).css("background-color", "");
            },
            
            eleLineHeightBtnClicked: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var LineHeightSetBox = utils.getElement('#' + gui.controls.eleLineHeightControl)[0]; 
                LineHeightPos = ($('input[name="eleLineHeightControl"]').val());
                LineHeightPos++;               
                var eleLineHeightVal = $(nameFound).css('line-height');
                LineHeightSetBox.innerHTML = LineHeightPos;
                LineHeightSetBox.value = LineHeightPos;
                $(nameFound).css("line-height", LineHeightPos + "px");
                $(nameFound).css("background-color", "");
            },

            eleLineHeightMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var LineHeightSetBox = utils.getElement('#' + gui.controls.eleLineHeightControl)[0]; 
                LineHeightPos = ($('input[name="eleLineHeightControl"]').val());
                LineHeightPos--;               
                var eleLineHeightVal = $(nameFound).css('line-height');
                LineHeightSetBox.innerHTML = LineHeightPos;
                LineHeightSetBox.value = LineHeightPos;
                $(nameFound).css("line-height", LineHeightPos + "px");
                $(nameFound).css("background-color", "");
            },

            elementWordSpaceChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var WordSpaceSetBox = utils.getElement('#' + gui.controls.eleWordSpaceControl)[0];
                var eleWordSpaceVal = $(nameFound).css('word-spacing');
                WordSpacePos = ($('input[name="eleWordSpaceControl"]').val());
                var addButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceBtn)[0]; 
                var addMinusButWordSpace = utils.getElement('#' + gui.controls.eleWordSpaceMinusBtn)[0];              
                addButWordSpace.disabled = false;
                addMinusButWordSpace.disabled = false;              
                $(nameFound).css("word-spacing", WordSpacePos + "px");
                $(nameFound).css("background-color", "");
            },
            
            eleWordSpaceBtnClicked: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var WordSpaceSetBox = utils.getElement('#' + gui.controls.eleWordSpaceControl)[0]; 
                WordSpacePos = ($('input[name="eleWordSpaceControl"]').val());
                WordSpacePos++;               
                var eleWordSpaceVal = $(nameFound).css('word-spacing');
                WordSpaceSetBox.innerHTML = WordSpacePos;
                WordSpaceSetBox.value = WordSpacePos;
                $(nameFound).css("word-spacing", WordSpacePos + "px");
                $(nameFound).css("background-color", "");
            },

            eleWordSpaceMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var WordSpaceSetBox = utils.getElement('#' + gui.controls.eleWordSpaceControl)[0]; 
                WordSpacePos = ($('input[name="eleWordSpaceControl"]').val());
                WordSpacePos--;               
                var eleWordSpaceVal = $(nameFound).css('word-spacing');
                WordSpaceSetBox.innerHTML = WordSpacePos;
                WordSpaceSetBox.value = WordSpacePos;
                $(nameFound).css("word-spacing", WordSpacePos + "px");
                $(nameFound).css("background-color", "");
            },
            
            elementLetSpaceChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var LetSpaceSetBox = utils.getElement('#' + gui.controls.eleLetSpaceControl)[0];
                var eleLetSpaceVal = $(nameFound).css('letter-spacing');
                LetSpacePos = ($('input[name="eleLetSpaceControl"]').val());
                var addButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceBtn)[0]; 
                var addMinusButLetSpace = utils.getElement('#' + gui.controls.eleLetSpaceMinusBtn)[0];                
                $(nameFound).css("letter-spacing", LetSpacePos + "px");
                $(nameFound).css("background-color", "");
            },
            
            eleLetSpaceBtnClicked: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var LetSpaceSetBox = utils.getElement('#' + gui.controls.eleLetSpaceControl)[0];
                LetSpacePos = ($('input[name="eleLetSpaceControl"]').val());
                LetSpacePos++;               
                var eleLetSpaceVal = $(nameFound).css('letter-spacing');
                LetSpaceSetBox.innerHTML = LetSpacePos;
                LetSpaceSetBox.value = LetSpacePos;
                $(nameFound).css("letter-spacing", LetSpacePos + "px");
                $(nameFound).css("background-color", "");
            },

            eleLetSpaceMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var LetSpaceSetBox = utils.getElement('#' + gui.controls.eleLetSpaceControl)[0]; 
                LetSpacePos = ($('input[name="eleLetSpaceControl"]').val());
                LetSpacePos--;               
                var eleLetSpaceVal = $(nameFound).css('letter-spacing');
                LetSpaceSetBox.innerHTML = LetSpacePos;
                LetSpaceSetBox.value = LetSpacePos;
                $(nameFound).css("letter-spacing", LetSpacePos + "px");
                $(nameFound).css("background-color", "");
            },

            elementTextIndentChanged: function (e) {
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                var TextIndentSetBox = utils.getElement('#' + gui.controls.eleTextIndentControl)[0];
                var eleTextIndentVal = $(nameFound).css('text-indent');
                TextIndentPos = ($('input[name="eleTextIndentControl"]').val());
                var addButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentBtn)[0]; 
                var addMinusButTextIndent = utils.getElement('#' + gui.controls.eleTextIndentMinusBtn)[0];                
                $(nameFound).css("text-indent", TextIndentPos + "px");
                $(nameFound).css("background-color", "");
            },
            
            eleTextIndentBtnClicked: function (e) { 
                
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var TextIndentSetBox = utils.getElement('#' + gui.controls.eleTextIndentControl)[0];
                TextIndentPos = ($('input[name="eleTextIndentControl"]').val());
                TextIndentPos++;               
                var eleTextIndentVal = $(nameFound).css('text-indent');
                TextIndentSetBox.innerHTML = TextIndentPos;
                TextIndentSetBox.value = TextIndentPos;
                $(nameFound).css("text-indent", TextIndentPos + "px");
                $(nameFound).css("background-color", "");
            },

            eleTextIndentMinusBtnClicked: function (e) { 
                var eleSearchControlBox = utils.getElement('#' + gui.controls.eleSearchControl)[0]; 
                var eleComboBox = utils.getElement('#' + gui.controls.elementName)[0]; 
                if(eleSearchControlBox.style.display === "inline-block") {
                    var sv = $('select[name="eleSearchControl"] option:selected').val(); 
                    sv = searchEleNum[sv]+1;
                }
                else{
                    var sv = $('select[name="cmbElement"] option:selected').val();
                }
                var nameFound = document.getElementsByName('tempName' + (sv)); 
                selectCssVal = $('select[name="cssControl"] option:selected').text();
                var TextIndentSetBox = utils.getElement('#' + gui.controls.eleTextIndentControl)[0]; 
                TextIndentPos = ($('input[name="eleTextIndentControl"]').val());
                TextIndentPos--;               
                var eleTextIndentVal = $(nameFound).css('text-indent');
                TextIndentSetBox.innerHTML = TextIndentPos;
                TextIndentSetBox.value = TextIndentPos;
                $(nameFound).css("text-indent", TextIndentPos + "px");
                $(nameFound).css("background-color", "");
            },
            cssPropertyTextChanged: function (e) {
                var cssTextFound = utils.getElement('#' + gui.controls.cssPropertyText)[0];
                if (cssTextFound.value === "") {
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].disabled = true;
                }
                else{
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].disabled = false;    
                }
            },
            cssPropertyValChanged: function (e) {
                var cssVal;
                var cssTextVal;
                var cssValFound = utils.getElement('#' + gui.controls.cssPropertyVal)[0];
                var addCssStyleDiv = utils.getElement('#' + gui.controls.addedCssStyle)[0];
                console.log(addCssStyleDiv);
                if (cssValFound.value != "") {    
                    cssVal = utils.getElement('#' + gui.controls.cssPropertyVal)[0].value.toLowerCase();
                    cssTextVal = utils.getElement('#' + gui.controls.cssPropertyText)[0].value.toLowerCase();
                    var sv = $('select[name="cmbElement"] option:selected').val(); 
                    var nameFound = document.getElementsByName('tempName' + (sv));
                    $(nameFound).css("background-color", "");
                    console.log(nameFound, cssTextVal, cssVal);
                    $(nameFound).css(cssTextVal,cssVal);
                    utils.getElement('#' + gui.controls.addedCssStyle)[0].style.display = "block";
                    utils.getElement('#' + gui.controls.addCssSaveBtn)[0].style.display = "block";
                }
                else{
                    utils.getElement('#' + gui.controls.cssPropertyVal)[0].disabled = false;    
                }
            },

            addCssSaveBtnClicked: function (e) {
                var cssVal;
                var cssTextVal;
                var cssValFound = utils.getElement('#' + gui.controls.cssPropertyVal)[0];
                var cssPropValFound = utils.getElement('#' + gui.controls.cssPropertyText)[0];
                cssVal = utils.getElement('#' + gui.controls.cssPropertyVal)[0].value.toLowerCase();
                cssTextVal = utils.getElement('#' + gui.controls.cssPropertyText)[0].value.toLowerCase();
                var sv = $('select[name="cmbElement"] option:selected').val(); 
                var nameFound = document.getElementsByName('tempName' + (sv));
                console.log(nameFound);
                if (cssValFound.value != "") {    
                    onCheckaddedStyle = document.createElement('input');
                    onCheckaddedStyle.type = 'checkbox';
                    onCheckaddedStyle.id = 'onCheckaddedStyle' + b;
                    onCheckaddedStyle.checked = 'checked';
                    onCheckaddedStyle.addEventListener('change', events.onCheckaddedStyleCheck);
                    console.log(b);
                    (utils.getElement('#' + gui.controls.addedCssStyle)[0]).appendChild(onCheckaddedStyle);
                    var divStyle = $('<span>'+cssTextVal+ '=' +cssVal+'</span></br>');
                    divStyle.addClass('classStyle'+b);
                    // cssPropAddText.push(cssTextVal);
                    // cssPropAddStyle.push(cssVal);
                    // console.log(ele[sv]);
                    var nameValue = 'tempName' + (sv);
                    // var styleNew = [{cssTextvalname:cssTextVal,cssStylevalname:cssVal,cssNamevalname:nameValue,cssCheckvalname:(onCheckaddedStyle.checked)}];
                    // console.log(styleNew[0]);
                    cssPropAddAll.push({cssTextvalname:cssTextVal,cssStylevalname:cssVal,cssNamevalname:nameValue,cssCheckvalname:$('#onCheckaddedStyle'+b).is(':checked')});
                    console.log(cssPropAddAll[0].cssCheckvalname);
                    divStyle.appendTo(utils.getElement('#' + gui.controls.addedCssStyle)[0]);
                    cssVal = "";
                    cssTextVal = "";
                    cssValFound.innerHTML = "";
                    cssValFound.value = "";
                    cssPropValFound.innerHTML = "";
                    cssPropValFound.value = "";
                    b++;
                }
            },
            onCheckaddedStyleCheck: function (e) {
                var sv = $('select[name="cmbElement"] option:selected').val(); 
                var nameFound = document.getElementsByName('tempName' + (sv));
                var cssValFound = utils.getElement('#' + gui.controls.addedCssStyle)[0];
                var cssStyleChange;
                var idCheckBoxValue = this.id;
                console.log(idCheckBoxValue);
                var resId = idCheckBoxValue.slice(17);
                console.log(resId);//get the id 'b' value
                var spanClass = '.classStyle'+resId;
                console.log(spanClass);
                cssStyleChange = $(spanClass).html();
                console.log(cssStyleChange);
                var cssPropRetrieve = cssPropAddAll[resId-1].cssTextvalname;
                if (this.checked) {
                    $(nameFound).css(cssPropRetrieve,(cssPropAddAll[resId-1].cssStylevalname));
                    cssPropAddAll[resId-1].cssCheckvalname = $('#onCheckaddedStyle'+resId).is(':checked');
                    // var cssPropRetrieve = (cssPropAddText[resId-1]);
                    // var cssStyleRetrieve = (cssPropAddStyle[resId-1]);
                    
                    
                }
                else {
                    cssPropAddAll[resId-1].cssCheckvalname = $('#onCheckaddedStyle'+resId).is(':checked');
                    $(nameFound).css(cssPropRetrieve, "");
                }
            },



            topPositionChanged: function (e) {
                utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                    backgroundPositionY: (e.target.value != '') ? e.target.value + 'px' : '0'

                });
            },
            leftPositionChanged: function (e) {
                utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                    backgroundPositionX: (e.target.value != '') ? e.target.value + 'px' : '0'
                });
            },
            hideUIClick: function () {
                utils.css(utils.getElement('#' + gui.layers.controlsContainer)[0], {
                    display: 'none'
                });
            },
            closeUIClick: function () {
                if (variables.isBookmarklet) {
                    publicMethods.hide();
                } else {
                    publicMethods.minimize();
                }
                 for (e=0; e < numOptions; e++){
                    $(document.getElementsByName('tempName' + e)).css("background-color", "");
                    
                }
                events.hideGuides();
                variables.isBookmarklet = false;
            },
            showCssClick: function () {
                if (variables.isBookmarklet) {
                    publicMethods.hide();
                } else {
                    publicMethods.minimize();
                }
                for (var i=0;i<classCollector.length;i++) {
                    var rowi = classCollector[i];
                    var classesli = rowi[0];
                    var topsli = rowi[1];
                    var leftsli = rowi[2];
                    $('<p>\ .'+classesli+' {\ '+topsli+';\ '+leftsli+';}</p>').appendTo('#dragPosContainer');
                }
                $('#dragPosContainer, .dragPosOverlay').show();
                events.hideGuides();
                variables.isBookmarklet = false;
            },
            thumbnailClick: function (e) {
                var top = utils.getElement('#' + gui.controls.topPosition)[0].value + 'px',
                    left = utils.getElement('#' + gui.controls.leftPosition)[0].value + 'px',
                    thumbnails = utils.getElement('#' + gui.layers.thumbsContainer + ' img.' + gui.classes.selectedThumbnail),
                    currentOpacity = utils.getElement('#' + gui.controls.opacitySlider)[0].value;

                for (var thumbnail = 0; thumbnail < thumbnails.length; thumbnail++) {
                    utils.css(thumbnails[thumbnail], {
                        border: 'solid 1px #ccc',
                        opacity: 1
                    });
                    utils.attr(thumbnails[thumbnail], {
                        'class': ''
                    });
                }

                utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                    background: 'url("' + e.target.src + '") ' + left + ' ' + top + ' no-repeat',
                    zIndex: utils.getMaxIndex(),
                    display: (currentOpacity == 0) ? 'none' : 'block'
                });

                if (utils.getElement('#' + gui.controls.showGuides)[0].checked === true) {
                    events.showGuides();
                } else {
                    if (currentOpacity == 0) {
                        utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                            display: 'none'
                        });
                    } else {
                        utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                            display: 'inline'
                        });
                    }
                }

                utils.css(utils.getElement('#' + gui.layers.controlsContainer)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(e.target, {
                    opacity: .6,
                    border: 'dashed 1px #666'
                }).attr(e.target, {
                    'class': gui.classes.selectedThumbnail
                });
            },
            orientationChanged: function () {
                var thumbsContainer = utils.getElement('#' + gui.layers.thumbsContainer)[0],
                    buttonsContainer = utils.getElement('#' + gui.layers.buttonsContainer)[0],
                    imageLayer = utils.getElement('#' + gui.layers.imageContainer)[0];
                if (screen.height < variables.minScreenHeight) {
                    utils.css(thumbsContainer, {
                        maxHeight: variables.phoneHeight
                    });
                    utils.css(buttonsContainer, {
                        display: 'none'
                    });
                } else {
                    utils.css(thumbsContainer, {
                        maxHeight: variables.generalHeight
                    });
                    utils.css(buttonsContainer, {
                        display: 'block'
                    });
                }
            },
            listenTouchGestures: function (e) {
                if (variables.enableTouchGestures == true && variables.isLoaded == true) {
                    if (e.touches[1]) {
                        if (gestures.launch.touchedCorners.topLeft && gestures.launch.touchedCorners.topRight &&
                            gestures.launch.touchedCorners.bottomLeft && gestures.launch.touchedCorners.bottomRight) {
                            publicMethods.restore();
                        }
                        events.resetLauncherTouchGesture();
                    }

                    var yPosition = e.touches[0].pageY,
                        xPosition = e.touches[0].pageX,
                        screenHeight = window.innerHeight,
                        screenWidth = window.innerWidth;

                    if ((yPosition <= gestures.launch.areaSize && yPosition >= 0) && (xPosition >= 0 &&
                        xPosition <= gestures.launch.areaSize)) {
                        gestures.launch.touchedCorners.topLeft = true;
                    }

                    if ((yPosition <= gestures.launch.areaSize && yPosition >= 0) &&
                        (xPosition >= (screenWidth - gestures.launch.areaSize) && xPosition <= screenWidth)) {
                        gestures.launch.touchedCorners.topRight = true;
                    }

                    if ((yPosition <= screenHeight && yPosition >= (screenHeight - gestures.launch.areaSize)) &&
                        (xPosition >= (screenWidth - gestures.launch.areaSize) && xPosition <= screenWidth)) {
                        gestures.launch.touchedCorners.bottomRight = true;
                    }

                    if ((yPosition <= screenHeight && yPosition >= (screenHeight - gestures.launch.areaSize)) &&
                        (xPosition >= 0 && xPosition <= gestures.launch.areaSize)) {
                        gestures.launch.touchedCorners.bottomLeft = true;
                    }
                }
            },
            resetLauncherTouchGesture: function () {
                gestures.launch.touchedCorners.topLeft = gestures.launch.touchedCorners.topRight =
                    gestures.launch.touchedCorners.bottomLeft = gestures.launch.touchedCorners.bottomRight = false;
            },
            scrollDown: function () {
                utils.getElement('#' + gui.layers.thumbsContainer)[0].scrollTop += 100;
            },
            scrollUp: function () {
                utils.getElement('#' + gui.layers.thumbsContainer)[0].scrollTop -= 100;
            },
            stopPropagation: function (e) {
                e.stopPropagation();
            },
            preventDefault: function (e) {
                e.preventDefault();
            },
            imageLayerTouchStart: function (e) {
                if (utils.getElement('#' + gui.controls.dragImage)[0].checked) {
                    utils.getElement('#' + gui.controls.topLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.topPosition)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftPosition)[0].style.display = "inline";
                    var top = utils.getStyle(utils.getElement('#' + gui.layers.imageContainer)[0], 'background-position-y'),

                        left = utils.getStyle(utils.getElement('#' + gui.layers.imageContainer)[0], 'background-position-x');
                    variables.positionOffset = {
                        x: e.changedTouches[0].pageX - parseInt(left),
                        y: e.changedTouches[0].pageY - parseInt(top)
                    };
                    if (variables.disableOverscroll == true) {
                        utils.getElement('body')[0].addEventListener('touchmove', events.preventDefault);
                    }
                }
            },
            imageLayerTouchMove: function (e) {
                if (utils.getElement('#' + gui.controls.dragImage)[0].checked) {
                    utils.getElement('#' + gui.controls.topLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.topPosition)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftPosition)[0].style.display = "inline";
                    var leftPosition = e.changedTouches[0].pageX - variables.positionOffset.x,
                        topPosition = e.changedTouches[0].pageY - variables.positionOffset.y;

                    utils.getElement('#' + gui.controls.leftPosition)[0].value = leftPosition;
                    utils.getElement('#' + gui.controls.topPosition)[0].value = topPosition;
                    utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                        backgroundPositionX: leftPosition + 'px',
                        backgroundPositionY: topPosition + 'px'
                    });
                }
            },
            imageLayerTouchEnd: function (e) {
                if (variables.disableOverscroll == true) {
                    utils.getElement('body')[0].removeEventListener('touchmove', events.preventDefault);
                }
            },
            imageLayerMouseDown: function (e) {
                if (!variables.touchSupport && utils.getElement('#' + gui.controls.dragImage)[0].checked) {
                    variables.mouseIsDown = true;
                    utils.getElement('#' + gui.controls.topLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.topPosition)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftPosition)[0].style.display = "inline";
                    var top = utils.getStyle(utils.getElement('#' + gui.layers.imageContainer)[0], 'background-position-y'),
                        left = utils.getStyle(utils.getElement('#' + gui.layers.imageContainer)[0], 'background-position-x');
                    variables.positionOffset = {
                        x: e.clientX - parseInt(left),
                        y: e.clientY - parseInt(top)
                    };
                }
            },
            imageLayerMouseUp: function (e) {
                if (!variables.touchSupport) variables.mouseIsDown = false;
            },
            imageLayerMouseMove: function (e) {
                if (!variables.touchSupport && variables.mouseIsDown &&
                    utils.getElement('#' + gui.controls.dragImage)[0].checked) {
                    utils.getElement('#' + gui.controls.topLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.topPosition)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftPosition)[0].style.display = "inline";
                    var leftPosition = e.clientX - variables.positionOffset.x,
                        topPosition = e.clientY - variables.positionOffset.y;

                    utils.getElement('#' + gui.controls.leftPosition)[0].value = leftPosition;
                    utils.getElement('#' + gui.controls.topPosition)[0].value = topPosition;
                    utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                        backgroundPositionX: leftPosition + 'px',
                        backgroundPositionY: topPosition + 'px'
                    });
                }
            },
            allowImageDraggingCheckbox: function (e) {
                if(utils.getElement('#' + gui.controls.dragImage)[0].checked) {
                    utils.getElement('#' + gui.controls.topLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.topPosition)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftLabel)[0].style.display = "inline";
                    utils.getElement('#' + gui.controls.leftPosition)[0].style.display = "inline";
                }
                else{
                    utils.getElement('#' + gui.controls.topLabel)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.topPosition)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.leftLabel)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.leftPosition)[0].style.display = "none";
                }
                utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                    cursor: (e.target.checked === true) ? 'move' : 'default'

                });
            },
            searchControlCheckbox: function (e) {
                if(utils.getElement('#' + gui.controls.searchControl)[0].checked) {
                    utils.getElement('#' + gui.controls.searchSelLabel)[0].style.display = "inline-block";
                    utils.getElement('#' + gui.controls.searchSelControl)[0].style.display = "inline-block"; 
                    utils.getElement('#' + gui.controls.eleSearchControl)[0].value = "";
                    utils.getElement('#' + gui.controls.searchSelControl)[0].value = "";
                    console.log(utils.getElement('#' + gui.controls.eleSearchControl)[0].value);
                }
                else{
                    utils.getElement('#' + gui.controls.searchSelLabel)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.searchSelControl)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.eleSearchControl)[0].style.display = "none";
                    utils.getElement('#' + gui.controls.eleSearchControl)[0].value = "";
                    utils.getElement('#' + gui.controls.searchSelControl)[0].value = "";
                    utils.getElement('#' + gui.controls.elementName)[0].style.display = "inline-block";

                }
            },
            editNotes: function (e) {
                var noteContainers = utils.getElement('.' + gui.classes.noteContent),
                    noteActionButtons = utils.getElement('.' + gui.classes.removeNote + ',.' +
                        gui.classes.moveNote + ',.' + gui.classes.removeSquare + ',.' + gui.classes.resizeSquare);
                if (e.target.checked === true) {
                    for (var element = 0; element < noteContainers.length; element++) {
                        utils.attr(noteContainers[element], {
                            contenteditable: 'true'
                        });
                    }
                    for (var element = 0; element < noteActionButtons.length; element++) {
                        utils.css(noteActionButtons[element], {
                            display: 'block'
                        });
                    }
                } else {
                    for (var element = 0; element < noteContainers.length; element++) {
                        utils.attr(noteContainers[element], {
                            contenteditable: 'false'
                        });
                    }
                    for (var element = 0; element < noteActionButtons.length; element++) {
                        utils.css(noteActionButtons[element], {
                            display: 'none'
                        });
                    }
                }

                //  if(utils.getElement('#' + gui.controls.editNotes)[0].checked) {
                //     utils.getElement('#' + gui.controls.cssPropertyText)[0].style.display = "inline";
                //     utils.getElement('#' + gui.controls.addCssLabel)[0].style.display = "inline";
                //     utils.getElement('#' + gui.controls.cssPropertyVal)[0].style.display = "inline";
                //     utils.getElement('#' + gui.controls.addCssApplyBtn)[0].style.display = "inline";
                // }
                // else{
                //     utils.getElement('#' + gui.controls.cssPropertyText)[0].style.display = "none";
                //     utils.getElement('#' + gui.controls.cssPropertyText)[0].value = "";
                //     utils.getElement('#' + gui.controls.addCssLabel)[0].style.display = "none";
                //     utils.getElement('#' + gui.controls.cssPropertyVal)[0].style.display = "none";
                //     utils.getElement('#' + gui.controls.cssPropertyVal)[0].value = "0px";
                //     utils.getElement('#' + gui.controls.addCssApplyBtn)[0].style.display = "none";
                // }
                // utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                //     cursor: (e.target.checked === true) ? 'move' : 'default'

                // });

            },
            toggleGuides: function (e) {
                if (e.target.checked === true) {
                    events.showGuides();
                    if (utils.getElement('#' + gui.controls.opacitySlider)[0].value == 0) {
                        utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                            display: 'inline-block'
                        });
                    }
                    utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                        display: 'inline'
                    });
                } else {
                    if (utils.getElement('#' + gui.controls.opacitySlider)[0].value == 0) {
                        utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                            display: 'none'
                        });
                    }
                    events.hideGuides();
                    if (utils.getStyle(utils.getElement('#' + gui.layers.imageContainer)[0], 'background-image') == 'none') {
                        utils.css(utils.getElement('#' + gui.controls.hideUI)[0], {
                            display: 'none'
                        });
                    }
                }
            },
            hideGuides: function () {
                utils.css(utils.getElement('#' + gui.layers.verticalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'none'
                }).css(utils.getElement('#' + gui.layers.verticalLinePixels)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'none'
                }).css(utils.getElement('#' + gui.controls.moveVerticalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'none'
                }).css(utils.getElement('#' + gui.layers.horizontalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'none'
                }).css(utils.getElement('#' + gui.layers.horizontalLinePixels)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'none'
                }).css(utils.getElement('#' + gui.controls.moveHorizontalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'none'
                });
            },
            showGuides: function () {
                utils.css(utils.getElement('#' + gui.layers.verticalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(utils.getElement('#' + gui.layers.verticalLinePixels)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(utils.getElement('#' + gui.controls.moveVerticalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(utils.getElement('#' + gui.layers.horizontalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(utils.getElement('#' + gui.layers.horizontalLinePixels)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(utils.getElement('#' + gui.controls.moveHorizontalLine)[0], {
                    zIndex: utils.getMaxIndex(),
                    display: 'block'
                }).css(utils.getElement('#' + gui.layers.controlsContainer)[0], {
                    zIndex: utils.getMaxIndex()
                });
            },
            moveWithKeys: function (e) {
                if (variables.enableKeys) {
                    var leftPositionControl = utils.getElement('#' + gui.controls.leftPosition)[0],
                        topPositionControl = utils.getElement('#' + gui.controls.topPosition)[0],
                        leftPosition = parseInt(leftPositionControl.value),
                        topPosition = parseInt(topPositionControl.value);

                    switch (e.keyCode) {
                    case 38:
                        topPosition--;
                        break;
                    case 40:
                        topPosition++;
                        break;
                    case 37:
                        leftPosition--;
                        break;
                    case 39:
                        leftPosition++;
                        break;
                    }

                    utils.css(utils.getElement('#' + gui.layers.imageContainer)[0], {
                        backgroundPositionX: leftPosition + 'px',
                        backgroundPositionY: topPosition + 'px'
                    });
                    topPositionControl.value = topPosition;
                    leftPositionControl.value = leftPosition;
                }
            },
            verticalLinePixelsTogglePosition: function (e) {
                if (parseInt(utils.getStyle(e.target, 'top')) == '10') {
                    utils.css(e.target, {
                        bottom: '10px',
                        top: ''
                    });
                } else {
                    utils.css(e.target, {
                        top: '10px',
                        bottom: ''
                    });
                }
            },
            horizontalLinePixelsTogglePosition: function (e) {
                if (parseInt(utils.getStyle(e.target, 'left')) == '10') {
                    utils.css(e.target, {
                        right: '10px',
                        left: ''
                    });
                } else {
                    utils.css(e.target, {
                        left: '10px',
                        right: ''
                    });
                }
            },
            verticalLineControlClick: function (e) {
                e.stopPropagation();
                var verticalLinePixels = utils.getElement('#' + gui.layers.verticalLinePixels)[0];
                if (utils.getStyle(verticalLinePixels, 'visibility') == 'hidden') {
                    utils.css(verticalLinePixels, {
                        visibility: 'visible'
                    });
                } else {
                    utils.css(verticalLinePixels, {
                        visibility: 'hidden'
                    });
                }
            },
            verticalLineControlTouchStart: function (e) {
                var left = utils.getStyle(utils.getElement('#' + gui.layers.verticalLine)[0], 'left'),
                    top = utils.getStyle(utils.getElement('#' + gui.controls.moveVerticalLine)[0], 'top');

                variables.guidesPosition.verticalLineLeft = e.changedTouches[0].pageX - parseInt(left);
                variables.guidesPosition.verticalLineTop = e.changedTouches[0].pageY - parseInt(top);
            },
            verticalLineControlTouchMove: function (e) {
                var leftPosition = e.changedTouches[0].pageX - variables.guidesPosition.verticalLineLeft,
                    topPosition = e.changedTouches[0].pageY - variables.guidesPosition.verticalLineTop;

                utils.css(utils.getElement('#' + gui.layers.verticalLine)[0], {
                    left: leftPosition + 'px'
                });

                if (leftPosition >= (window.innerWidth / 2)) {
                    var pixelsContainerWidth = utils.getStyle(utils.getElement('#' + gui.layers.verticalLinePixels)[0], 'width');
                    utils.css(utils.getElement('#' + gui.layers.verticalLinePixels)[0], {
                        left: leftPosition - 6 - parseInt(pixelsContainerWidth) + 'px',
                        borderRadius: '3px 0 0 3px'
                    });
                } else {
                    utils.css(utils.getElement('#' + gui.layers.verticalLinePixels)[0], {
                        left: leftPosition + 1 + 'px',
                        borderRadius: '0 3px 3px 0'
                    });
                }
                utils.getElement('#' + gui.layers.verticalLinePixels)[0].innerHTML = leftPosition + 'px';
                utils.css(utils.getElement('#' + gui.controls.moveVerticalLine)[0], {
                    left: (leftPosition - 20) + 'px',
                    top: topPosition + 'px'
                });
            },
            horizontalLineControlClick: function (e) {
                e.stopPropagation();
                var horizontalLinePixels = utils.getElement('#' + gui.layers.horizontalLinePixels)[0];
                if (utils.getStyle(horizontalLinePixels, 'visibility') == 'hidden') {
                    utils.css(horizontalLinePixels, {
                        visibility: 'visible'
                    });
                } else {
                    utils.css(horizontalLinePixels, {
                        visibility: 'hidden'
                    });
                }
            },
            horizontalLineControlTouchStart: function (e) {
                var left = utils.getStyle(utils.getElement('#' + gui.layers.horizontalLine)[0], 'left'),
                    top = utils.getStyle(utils.getElement('#' + gui.layers.horizontalLine)[0], 'top');

                variables.guidesPosition.horizontalLineLeft = e.changedTouches[0].pageX - parseInt(left);
                variables.guidesPosition.horizontalLineTop = e.changedTouches[0].pageY - parseInt(top);
            },
            horizontalLineControlTouchMove: function (e) {
                var leftPosition = e.changedTouches[0].pageX,
                    topPosition = e.changedTouches[0].pageY - variables.guidesPosition.horizontalLineTop;

                utils.css(utils.getElement('#' + gui.layers.horizontalLine)[0], {
                    top: topPosition + 'px'
                });

                if (topPosition >= (window.innerHeight / 2)) {
                    var pixelsContainerHeight = utils.getStyle(utils.getElement('#' + gui.layers.horizontalLinePixels)[0], 'height');
                    utils.css(utils.getElement('#' + gui.layers.horizontalLinePixels)[0], {
                        top: topPosition - parseInt(pixelsContainerHeight) - 6 + 'px',
                        borderRadius: '3px 3px 0 0 '
                    });
                } else {
                    utils.css(utils.getElement('#' + gui.layers.horizontalLinePixels)[0], {
                        top: topPosition + 1 + 'px',
                        borderRadius: '0 0 3px 3px',
                    });
                }
                utils.getElement('#' + gui.layers.horizontalLinePixels)[0].innerHTML = topPosition + 'px';

                utils.css(utils.getElement('#' + gui.controls.moveHorizontalLine)[0], {
                    left: (leftPosition - 19) + 'px',
                    top: (topPosition - 20) + 'px'
                });
            },
            launcherTouchStart: function (e) {
                var left = utils.getStyle(utils.getElement('#' + gui.layers.launcher)[0], 'left'),
                    top = utils.getStyle(utils.getElement('#' + gui.layers.launcher)[0], 'top');

                variables.launcherPosition.x = e.changedTouches[0].pageX - parseInt(left);
                variables.launcherPosition.y = e.changedTouches[0].pageY - parseInt(top);
            },
            launcherTouchMove: function (e) {
                var leftPosition = e.changedTouches[0].pageX - variables.launcherPosition.x,
                    topPosition = e.changedTouches[0].pageY - variables.launcherPosition.y;

                utils.css(utils.getElement('#' + gui.layers.launcher)[0], {
                    left: leftPosition + 'px',
                    top: topPosition + 'px'
                });
            },
            addSquareButtonClick: function () {
                var square = utils.createElement('div'),
                    notesAreEnabled = utils.getElement('#' + gui.controls.editNotes)[0].checked,
                    leftPosition = parseInt(utils.getStyle(utils.getElement('#' +
                        gui.layers.controlsContainer)[0], 'left'));

                utils.css(square, {
                    top: '150px',
                    left: (leftPosition === 0) ? (window.innerWidth - 150) + 'px' : '150px',
                    position: 'absolute',
                    zIndex: utils.getMaxIndex(),
                    border: 'solid 1px #f00',
                    width: '50px',
                    height: '50px'
                }).attr(square, {
                    'class': gui.classes.squareContainer
                });
                document.body.appendChild(square);

                var squareActions = utils.createElement('div');
                utils.attr(squareActions, {
                    'class': gui.classes.squareActionsContainer
                })
                utils.css(squareActions, {
                    position: 'absolute',
                    right: '-22px',
                    bottom: '0px'
                });
                square.appendChild(squareActions);

                var removeSquare = utils.createElement('div');
                utils.css(removeSquare, {
                    background: '#f00',
                    color: '#fff',
                    borderRadius: '3px',
                    marginBottom: '3px',
                    textAlign: 'center',
                    fontSize: '11px',
                    width: '20px',
                    display: (notesAreEnabled === true) ? 'block' : 'none'
                }).attr(removeSquare, {
                    'class': gui.classes.removeSquare
                });

                removeSquare.innerText = '✗';
                squareActions.appendChild(removeSquare);

                removeSquare.addEventListener('touchstart', events.removeSquareTouchStart);

                var resizeSquare = utils.createElement('div');
                utils.css(resizeSquare, {
                    background: '#f00',
                    color: '#fff',
                    borderRadius: '3px',
                    textAlign: 'center',
                    fontSize: '11px',
                    width: '20px',
                    display: (notesAreEnabled === true) ? 'block' : 'none'
                }).attr(resizeSquare, {
                    'class': gui.classes.resizeSquare
                });
                resizeSquare.innerText = '↘';
                squareActions.appendChild(resizeSquare);

                var startWidth = 0,
                    startHeight = 0;

                resizeSquare.addEventListener('touchstart', function (e) {
                    e.stopPropagation();

                    var actionsContainer = e.target.parentNode;
                    var left = utils.getStyle(actionsContainer.parentNode, 'left'),
                        top = utils.getStyle(actionsContainer.parentNode, 'top');

                    startWidth = parseInt(utils.getStyle(actionsContainer.parentNode, 'width'));
                    startHeight = parseInt(utils.getStyle(actionsContainer.parentNode, 'height'));

                    variables.positionOffset.x = e.changedTouches[0].pageX;
                    variables.positionOffset.y = e.changedTouches[0].pageY;
                });

                resizeSquare.addEventListener('touchmove', function (e) {
                    var actionsContainer = e.target.parentNode;
                    var leftPosition = e.changedTouches[0].pageX - variables.positionOffset.x,
                        topPosition = e.changedTouches[0].pageY - variables.positionOffset.y;

                    utils.css(actionsContainer.parentNode, {
                        width: startWidth + e.changedTouches[0].pageX - variables.positionOffset.x + 'px',
                        height: startHeight + e.changedTouches[0].pageY - variables.positionOffset.y + 'px',
                    });
                });

                square.addEventListener('touchstart', function (e) {
                    e.stopPropagation();
                    var left = utils.getStyle(e.target, 'left'),
                        top = utils.getStyle(e.target, 'top');

                    variables.positionOffset.x = e.changedTouches[0].pageX - parseInt(left);
                    variables.positionOffset.y = e.changedTouches[0].pageY - parseInt(top);
                });

                square.addEventListener('touchmove', function (e) {
                    var notesAreEnabled = utils.getElement('#' + gui.controls.editNotes)[0].checked;

                    if (notesAreEnabled === true) {
                        var leftPosition = e.changedTouches[0].pageX - variables.positionOffset.x,
                            topPosition = e.changedTouches[0].pageY - variables.positionOffset.y;

                        utils.css(e.target, {
                            left: leftPosition + 'px',
                            top: topPosition + 'px'
                        });
                    }
                });
            },
            removeSquareTouchStart: function (e) {
                e.stopPropagation();
                var actionsContainer = e.target.parentNode;

                if (confirm('Do you want to remove the shape?')) {
                    document.body.removeChild(actionsContainer.parentNode);
                }
            },
            addNoteButtonClick: function () {
                var noteText = prompt('Please, type the new note:', ''),
                    notesAreEnabled = utils.getElement('#' + gui.controls.editNotes)[0].checked,
                    leftPosition = parseInt(utils.getStyle(utils.getElement('#' +
                        gui.layers.controlsContainer)[0], 'left'));

                if (noteText && noteText != '') {
                    var noteContainer = utils.createElement('div');
                    utils.attr(noteContainer, {
                        'class': gui.classes.noteContainer,
                        contenteditable: 'false'
                    }).css(noteContainer, {
                        top: (leftPosition === 0) ? (window.innerHeight - 150) + 'px' : '150px',
                        left: '150px',
                        position: 'absolute',
                        color: variables.notesForeColor,
                        zIndex: utils.getMaxIndex()
                    });
                    document.body.appendChild(noteContainer);

                    var noteContent = utils.createElement('div');
                    utils.attr(noteContent, {
                        'class': gui.classes.noteContent,
                        contenteditable: (notesAreEnabled === true) ? 'true' : 'false',
                        autocorrect: 'off'
                    }).css(noteContent, {
                        font: 'normal 16px Arial'
                    });
                    noteContent.innerHTML = noteText;
                    noteContainer.appendChild(noteContent);

                    var noteActions = utils.createElement('div');
                    utils.attr(noteActions, {
                        'class': gui.classes.noteActionsContainer
                    }).css(noteActions, {
                        position: 'absolute',
                        right: '-30px',
                        top: '0px'
                    });
                    noteContainer.appendChild(noteActions);

                    var buttonRemove = utils.createElement('div');
                    utils.attr(buttonRemove, {
                        'class': gui.classes.removeNote
                    }).css(buttonRemove, {
                        color: '#fff',
                        borderRadius: '3px',
                        background: '#f00',
                        marginBottom: '3px',
                        textAlign: 'center',
                        fontSize: '11px',
                        width: '20px',
                        display: (notesAreEnabled === true) ? 'block' : 'none'
                    });
                    buttonRemove.innerText = '✗';
                    noteActions.appendChild(buttonRemove);
                    buttonRemove.addEventListener('touchstart', events.removeNoteTouchStart);

                    var buttonMove = utils.createElement('div');
                    utils.attr(buttonMove, {
                        'class': gui.classes.moveNote
                    }).css(buttonMove, {
                        color: '#fff',
                        borderRadius: '3px',
                        background: '#f00',
                        textAlign: 'center',
                        fontSize: '11px',
                        width: '20px',
                        display: (notesAreEnabled === true) ? 'block' : 'none'
                    });
                    buttonMove.innerText = '⁖';
                    noteActions.appendChild(buttonMove);

                    buttonMove.addEventListener('touchstart', events.moveNoteTouchStart);
                    buttonMove.addEventListener('touchmove', events.moveNoteTouchMove);
                }
            },
            removeNoteTouchStart: function (e) {
                e.stopPropagation();
                var actionsContainer = e.target.parentNode;

                if (confirm('Do you want to remove the note?')) {
                    document.body.removeChild(actionsContainer.parentNode);
                }
            },
            moveNoteTouchStart: function (e) {
                e.stopPropagation();
                var actionsContainer = e.target.parentNode,
                    noteContainer = actionsContainer.parentNode,
                    left = utils.getStyle(noteContainer, 'left'),
                    top = utils.getStyle(noteContainer, 'top');

                variables.positionOffset.x = e.changedTouches[0].pageX - parseInt(left);
                variables.positionOffset.y = e.changedTouches[0].pageY - parseInt(top);
            },
            moveNoteTouchMove: function (e) {
                var actionsContainer = e.target.parentNode,
                    noteContainer = actionsContainer.parentNode;
                var leftPosition = e.changedTouches[0].pageX - variables.positionOffset.x,
                    topPosition = e.changedTouches[0].pageY - variables.positionOffset.y;

                utils.css(noteContainer, {
                    left: leftPosition + 'px',
                    top: topPosition + 'px'
                });
            },
            imagesLoaded: function (imagesList) {
                var thumbsContainer = utils.getElement('#' + gui.layers.thumbsContainer)[0];

                if (imagesList) {
                    var lineCounter = 0;
                    for (var image = 0; image < imagesList.length; image++) {
                        if (variables.imagesFilter.length > 0) {
                            if (utils.inFilter(variables.imagesFilter, imagesList[image])) {
                                lineCounter++;

                                var thumbnail = utils.createThumbnail(imagesList[image]);
                                if (lineCounter > 3) {
                                    lineCounter = 1;
                                    thumbsContainer.appendChild(gui.rawElements.blockSeparator());
                                }
                                thumbsContainer.appendChild(thumbnail);
                            }
                        } else {
                            lineCounter++;

                            var thumbnail = utils.createThumbnail(imagesList[image]);
                            if (lineCounter > 3) {
                                lineCounter = 1;
                                thumbsContainer.appendChild(gui.rawElements.blockSeparator());
                            }
                            thumbsContainer.appendChild(thumbnail);
                        }
                    }

                    var thumbnails = utils.getElement('#' + gui.layers.thumbsContainer + ' img');

                    if (thumbnails.length == 0) {
                        variables.isLoaded = false;
                        publicMethods.destroy();
                    } else {
                        variables.isLoaded = true;
                    }
                } else {
                    variables.isLoaded = false;
                    publicMethods.destroy();
                }

                return this;
            }
        },
        publicMethods = {
            show: function () {
                var launcher = utils.getElement('#' + gui.layers.launcher)[0];
                utils.css(launcher, {
                    display: 'block'
                });

                return this;
            },
            hide: function () {
                var elements = utils.getElement('#' + gui.layers.controlsContainer +
                    ',#' + gui.layers.imageContainer + ',#' + gui.layers.launcher);

                for (var element = 0; element < elements.length; element++) {
                    utils.css(elements[element], {
                        display: 'none'
                    });
                }

                return this;
            },
            minimize: function () {
                var elements = utils.getElement('#' + gui.layers.imageContainer +
                    ',#' + gui.layers.controlsContainer);

                for (var element = 0; element < elements.length; element++) {
                    utils.css(elements[element], {
                        display: 'none'
                    });
                }

                var elements = utils.getElement('#' + gui.layers.launcher);
                utils.css(elements[0], {
                    display: 'block'
                });

                return this;
            },
            restore: function () {
                var elements = utils.getElement('#' + gui.layers.controlsContainer +
                    ',#' + gui.layers.imageContainer);

                for (var element = 0; element < elements.length; element++) {
                    utils.css(elements[element], {
                        display: 'block',
                        zIndex: utils.getMaxIndex()
                    });
                }

                if (utils.getStyle(elements[0], 'background-image') == 'none' ||
                    utils.getElement('#' + gui.controls.opacitySlider)[0].value == '0') {
                    utils.css(elements[0], {
                        display: 'none'
                    });
                }

                if (utils.getElement('#' + gui.controls.showGuides)[0].checked === true) {
                    events.showGuides();
                }

                var elements = utils.getElement('#' + gui.layers.launcher);
                utils.css(elements[0], {
                    display: 'none'
                });

                return this;
            },
            bookmarklet: function () {
                variables.isBookmarklet = true;
                publicMethods.restore();
            },
            load: function (imageSources) {
                gui.create();
                var imagesList = [];

                if (imageSources.xml) {
                    if (window.XMLHttpRequest) {
                        try {
                            var xmtRequest = new window.XMLHttpRequest();

                            xmtRequest.open('GET', imageSources.xml, true);
                            xmtRequest.onload = function () {
                                if (xmtRequest.readyState === 4) {
                                    if (xmtRequest.status == 200) {
                                        var response = xmtRequest.responseXML,
                                            images = response.getElementsByTagName(plugin.name)[0].getElementsByTagName('image');

                                        for (var image = 0; image < images.length; image++) {
                                            imagesList.push(images[image].childNodes[0].nodeValue);
                                        }

                                        if (imageSources.url) imagesList = imagesList.concat(imageSources.url);
                                        if (imageSources.filter) variables.imagesFilter = imageSources.filter;
                                        events.imagesLoaded(imagesList);
                                    }
                                }
                            };

                            xmtRequest.onerror = function () {
                                if (imageSources.filter) variables.imagesFilter = imageSources.filter;
                                if (imageSources.url) events.imagesLoaded(imageSources.url);
                            };

                            xmtRequest.send('');
                        } catch (e) {}
                    } else {
                        if (imageSources.filter) variables.imagesFilter = imageSources.filter;
                        if (imageSources.url) events.imagesLoaded(imageSources.url);
                    }
                } else {
                    if (imageSources.filter) variables.imagesFilter = imageSources.filter;
                    if (imageSources.url) events.imagesLoaded(imageSources.url);
                }

                return this;
            },
            destroy: function () {
                var elements = utils.getElement('#' + gui.layers.controlsContainer +
                    ',#' + gui.layers.imageContainer + ',#' + gui.layers.launcher + ',#' +
                    gui.layers.horizontalLine + ',#' + gui.layers.horizontalLinePixels +
                    ',#' + gui.layers.verticalLine + ',#' + gui.layers.verticalLinePixels +
                    ',#' + gui.controls.moveHorizontalLine + ',#' + gui.controls.moveVerticalLine);

                for (var element = 0; element < elements.length; element++) {
                    document.body.removeChild(elements[element]);
                }

                return this;
            },
            getInfo: function () {
                return {
                    version: plugin.version,
                    name: plugin.name,
                    longName: plugin.longName,
                    author: plugin.author,
                    lastUpdate: plugin.lastUpdate
                };
            },
            setPosition: function (position) {
                var launcher = utils.getElement('#' + gui.layers.launcher)[0];

                if (position) {
                    if (position.top) utils.css(launcher, {
                            top: position.top
                        });
                    if (position.left) utils.css(launcher, {
                            left: position.left
                        });
                }

                return this;
            },
            showScrollingButtons: function (controlsCaption) {
                var scrollDown = utils.getElement('#' + gui.controls.scrollDown)[0],
                    scrollUp = utils.getElement('#' + gui.controls.scrollUp)[0];

                utils.css(scrollDown, {
                    display: 'inline'
                });
                utils.css(scrollUp, {
                    display: 'inline'
                });

                if (controlsCaption) {
                    if (controlsCaption.up) scrollUp.value = controlsCaption.up;
                    if (controlsCaption.down) scrollDown.value = controlsCaption.down;
                }

                variables.showScrollingButtons = true;

                return this;
            },
            hideScrollingButtons: function () {
                var scrollDown = utils.getElement('#' + gui.controls.scrollDown)[0],
                    scrollUp = utils.getElement('#' + gui.controls.scrollUp)[0];

                utils.css(scrollDown, {
                    display: 'none'
                });
                utils.css(scrollUp, {
                    display: 'none'
                });
                variables.showScrollingButtons = false;

                return this;
            },
            enableOverscroll: function () {
                variables.disableOverscroll = false;

                return this;
            },
            disableOverscroll: function () {
                variables.disableOverscroll = true;

                return this;
            },
            enableTouchGestures: function () {
                variables.enableTouchGestures = true;

                return this;
            },
            disableTouchGestures: function () {
                variables.enableTouchGestures = false;

                return this;
            },
            disableKeys: function () {
                variables.enableKeys = false;

                return this;
            },
            enableKeys: function () {
                variables.enableKeys = true;

                return this;
            },
            keepAliveOnClose: function () {
                variables.keepAliveOnClose = true;

                return this;
            },
            bigSlider: function (size) {
                if (utils.isMobile()) {
                    size || (size = variables.bigSliderThumbSize);

                    var head = utils.getElement('head')[0],
                        cssRule = '.' + gui.classes.bigSliderThumb + '::-webkit-slider-thumb{' +
                            '-webkit-appearance: none !important; height:' + size + '; width:' + size + ';}';

                    if (head.innerHTML.indexOf(cssRule) === -1) {
                        cssRule = '<!-- line added by ' + plugin.name + ' -->\n<style type="text/css">' + cssRule + '</style>';
                        head.innerHTML += cssRule;

                        utils.attr(utils.getElement('#' + gui.controls.opacitySlider)[0], {
                            'class': gui.classes.bigSliderThumb
                        });
                    }
                }

                return this;
            },
            setNotesForeColor: function (foreColor) {
                foreColor || (foreColor = '#fff');
                variables.notesForeColor = foreColor;

                return this;
            }
        };

    window.addEventListener('orientationchange', events.orientationChanged);
    window.addEventListener('touchend', events.resetLauncherTouchGesture);
    window.addEventListener('touchmove', events.listenTouchGestures);

    return publicMethods;
})(window);

$(function () {  
    i = 0;
    $(ele).each(function () { 
        var topPos = this.offsetTop;
        var leftPos = this.offsetLeft;
        var posWidth = this.offsetWidth;
        var posHeight = this.offsetHeight;
        i++;
    });

$("<style>")
    .prop("type", "text/css")
    .html("\
    .myDrCo {\
        background-color: #585858;\
    }\
    .dragPosOverlay {\
        display: none;\
        position: absolute;\
        top: 0px;\
        left: 0px;\
        width: 100%;\
        height: 100%;\
        background-color: #000;\
        z-index: 1;\
        opacity: 0.5;\
    }\
    #dragCloseBtne {\
        background: #f00;\
        padding: 8px 10px 2px;\
        border-radius: 3px;\
        font-size: 20px;\
        cursor: crosshair;\
        position: absolute;\
        right: 5px;\
        top: 5px;\
        color: #fff;\
        '-webkit-user-select': 'none';\
    }\
    #dragPosContainer {\
        display: none;\
        position: absolute;\
        top: 200px;\
        left: 185px;\
        background-color: #fff;\
        width: 640px;\
        height: 380px;\
        overflow: auto;\
        z-index: 2;\
    }")
    .appendTo("head");

    
    $('body').prepend('<div class="dragPosOverlay"></div>');
    $('<div id="dragPosContainer"><div id="dragCloseBtne">✗</div></div>').appendTo('body');
    $('#dragCloseBtne').click(function(){
        $('#dragPosContainer, .dragPosOverlay').hide();
        $('#dragPosContainer p').empty();

    });

    $(document).bind("touchstart", function (e) {
        $("body *").removeClass('myDrCo');
        var test = $(e.originalEvent.targetTouches[0].target).attr('class');
        if (test === undefined) {
            test = $(e.originalEvent.targetTouches[0].target).attr('id');
            if (test === undefined) {
                console.log('standalone element with no id and class');
            }
        }
        else{
            test = test.split(' ')[0];
        }
        // console.log('.'+test.split(' ')[0]);
        $('.'+test).addClass('myDrCo');
        $('.'+test).draggable({
            start: function() {
                // update function when drag starts
                $(this).removeClass('myDrCo');
              },
              drag: function() {
                //update function when drag happens
              },
              stop: function() {
                // update function when drag stops
                var classi, topi, lefti;
                var j = 0;

                //get all css styles of the element - WORKING - Gets all css for specific into a variable
                    // $.ajax({
                    //     url: "../0.0_MerckEngage_Table_of_Contents/css/specific.css",
                    //     dataType: "text",
                    //     success: function(cssTexter) {
                    //       var elm, node;
                    //       cssCollector = cssTexter;
                          
                    //       console.log(cssCollector);
                    //     }
                    // });
                classi = test;
                topi = $(this).position().top;
                lefti = $(this).position().left;
                var matchi = [];   
                // Get all css associated with the document
                // $.each(document.styleSheets, function(sheetIndex, sheet) {
                //     // console.log("Looking at styleSheet[" + sheetIndex + "]:"); //Give the different stylesheets available in the document
                //     $.each(sheet.cssRules || sheet.rules, function(ruleIndex, rule) {
                //         if (rule.cssText.match(test)) {
                //             matchi.push("rule[" + ruleIndex + "]: " + rule.cssText);
                //         };
                        
                //     });
                // });
                // if (matchi.length>0) {
                //     matchi = matchi[0];
                //     console.log(matchi[0]);
                //     for (var key in matchi) {
                //         console.log(key + ': ' + matchi[key];
                //     }
                //     // console.log(matchi[0]);
                // }

                // Get the css for the element ----- exact values
                function css(a) {
                    var sheets = document.styleSheets, o = {};
                    for (var i in sheets) {
                        var rules = sheets[i].rules || sheets[i].cssRules;
                        for (var r in rules) {
                            if (a.is(rules[r].selectorText)) {
                                o = $.extend(o, css2json(rules[r].style), css2json(a.attr('style')));
                            }
                        }
                    }
                    return o;
                }

                function css2json(css) {
                    var s = {};
                    if (!css) return s;
                    if (css instanceof CSSStyleDeclaration) {
                        for (var i in css) {
                            if ((css[i]).toLowerCase) {
                                s[(css[i]).toLowerCase()] = (css[css[i]]);
                            }
                        }
                    } else if (typeof css == "string") {
                        css = css.split("; ");
                        for (var i in css) {
                            var l = css[i].split(": ");
                            s[l[0].toLowerCase()] = (l[1]);
                        }
                    }
                    return s;
                }

                var style = css($('.'+test));
                console.log(style);

               
                classi = test;
                topi = $(this).position().top;
                lefti = $(this).position().left;
                console.log(classi, topi, lefti, classCollector.length);
                // Collect and check in Class collector
                var row = [];
                if (jQuery.isEmptyObject(classCollector)) {
                    row.push(classi);
                    row.push(topi);
                    row.push(lefti);
                    // classCollector.push(row);
                    collectingArr();
                    j = 1;
                }
                else{
                    for (var i=0;i<classCollector.length;i++) {
                        var rowi = classCollector[i];
                        if (rowi[0].match(test)){
                            console.log('found');
                            rowi[1] = topi;
                            rowi[2] = lefti;
                            j = 1;
                        }
                    }
                }
                if (j === 0){
                    console.log('its here');
                    row.push(classi);
                    row.push(topi);
                    row.push(lefti);
                    collectingArr();
                }
                
                
                // stack in array the values
                function collectingArr(){
                    classCollector.push(row);
                }
                

                 //collecting all values 
                console.log(classCollector);
                //collect entire string available in div for checking duplicacy
                // var ContP = $('#dragPosContainer').text();
                // console.log(ContP);
                // if (!ContP){
                //  console.log('I am empty');
                // }
                // else{
                //  if (ContP.indexOf(test) !== -1) {
                //      console.log('found it');
                //  }
                // }

                // add text to div
                // $('<p>.'+classli+'{top:'+topsi+';left:'+leftsi+';}</p>').appendTo('#dragPosContainer');
                
                // Fill the div

          //       for (var i=0;i<classCollector.length;i++) {
                //     var rowi = classCollector[i];
                //     var classesli = rowi[0];
                //     var topsli = rowi[1];
                //     var leftsli = rowi[2];
                //     $('<p>\ .'+classesli+' {\ '+topsli+';\ '+leftsli+';}</p>').appendTo('#dragPosContainer');
                // }
                // $('#pContainer').appendTo('#dragPosContainer');
            }
        });
    });
})




// Gets all CSS values - huge list
// $.fn.getStyleObject = function(){
//     var dom = this.get(0);
//     var style;
//     var returns = {};
//     if(window.getComputedStyle){
//         var camelize = function(a,b){
//             return b.toUpperCase();
//         }
//         style = window.getComputedStyle(dom, null);
//         for(var i = 0, l = style.length; i < l; i++){
//             var prop = style[i];
//             var camel = prop.replace(/\-([a-z])/, camelize);
//             var val = style.getPropertyValue(prop);
//             returns[camel] = val;
//         }
//         return returns;
//     }
//     if(dom.currentStyle){
//         style = dom.currentStyle;
//         for(var prop in style){
//             returns[prop] = style[prop];
//         }
//         return returns;
//     }
//     if(style = dom.style){
//         for(var prop in style){
//             if(typeof style[prop] != 'function'){
//                 returns[prop] = style[prop];
//             }
//         }
//         return returns;
//     }
//     return returns;
// }


    // Monkey-patching original .css() method. Get CSS style
    // var jQuery_css = $.fn.css,
    //     gAttr = ['font-family','font-size','font-weight','font-style','color','text-transform','text-decoration','letter-spacing','word-spacing','line-height','text-align','background-color','background-size','-webkit-background-size','background-image','background-repeat','background-position','opacity','width','height','top','right','bottom','left','margin-top','margin-right','margin-bottom','margin-left','padding-top','padding-right','padding-bottom','padding-left','border-top-width','border-right-width','border-bottom-width','border-left-width','border-top-color','border-right-color','border-bottom-color','border-left-color','border-top-style','border-right-style','border-bottom-style','border-left-style','position','display','visibility','z-index','overflow-x','overflow-y','float','clear','cursor','list-style-image','list-style-position','list-style-type'];
    // $.fn.css = function() {
    //     if (arguments.length && !$.isArray(arguments[0])) return jQuery_css.apply(this, arguments);
    //     var attr = arguments[0] || gAttr,
    //         len = attr.length,
    //         obj = {};
    //     for (var i = 0; i < len; i++) obj[attr[i]] = jQuery_css.call(this, attr[i]);
    //     return obj;
    // }

$.fn.textEquals = function (text) {
    var match = false;
    $(this).each(function () {
        if ($(this).text().match("^" + escapeRegex(text) + "$")) {
            match = true;
            return false;
        }
    });
    return match;
};


