// File#: _2_markdown-editor
// Usage: codyhouse.co/license
(function() {
  function MdEditor(element, actions) {
    this.element = element;
    this.textarea = this.element.getElementsByClassName('js-md-editor__content');
    this.actionsWrapper = this.element.getElementsByClassName('js-md-editor__actions');
    this.actions = actions ? actions : MdEditor.defaults;
    initMdEditor(this);
  };

  function initMdEditor(element) {
    if(element.textarea.length < 1 || element.actionsWrapper.length < 1) return;
    
    element.actionsWrapper[0].addEventListener('click', function(event){
      insertMdCode(element, event.target.closest('[data-md-action]'));
    });
  };

  function insertMdCode(element, btn) {
    if(!btn) return;
    updateTextareaSelection(element);
    var code = getCode(element, btn.getAttribute('data-md-action'));
    replaceSelectedText(element, code);
  };

  function updateTextareaSelection(element) {
    // store textarea info (e.g., selection range, start and end selection range)
    element.selectionStart = element.textarea[0].selectionStart,
    element.selectionEnd = element.textarea[0].selectionEnd;
    element.selectionContent = element.textarea[0].value.slice(element.selectionStart, element.selectionEnd);
  };

  function getCode(element, action) { // get content to insert in the textarea
    var actionInfo = getActionInfo(element, action)[0]; // returns {action.content, action.newLine}
    if(actionInfo.content == '') return element.selectionContent;
    if(actionInfo.content.indexOf('content') < 0) {
      // e.g. for the lists, we do not modify the selected code but we add an example of how the list is formatted
      element.selectionStart = element.selectionStart + element.selectionContent.length;
      element.selectionContent = '';
    }
    var newContent = actionInfo.content.replace('content', element.selectionContent);
    if(addNewLine(element, actionInfo.newLine)) newContent = '\n'+newContent;
    return newContent;
  };

  function replaceSelectedText(element, text) {
    var value = element.textarea[0].value;
    element.textarea[0].value = value.slice(0, element.selectionStart) + text + value.slice(element.selectionEnd);
    // move focus back to texarea and select text that was previously selected (if any)
    element.textarea[0].focus();
    element.textarea[0].selectionEnd = element.selectionEnd - element.selectionContent.length + text.length - element.actionEndLength;
    if(element.selectionStart != element.selectionEnd) {
      element.textarea[0].selectionStart = element.textarea[0].selectionEnd - element.selectionContent.length;
    } else {
      element.textarea[0].selectionStart = element.textarea[0].selectionEnd;
    }
  };

  function getActionInfo(element, action) {
    var actionInfo = [];
    for(var i = 0; i < Object.keys(element.actions).length; i++) {
      if(element.actions[i].action == action) {
        actionInfo.push(element.actions[i]);
        element.actionEndLength = getEndLength(element.actions[i].content);
        break;
      }
    }
    return actionInfo;
  };

  function addNewLine(element, newLine) {
    if(!newLine) return false;
    if(element.selectionStart < 1) return false;
    if(element.selectionStart > 0) {
      // take character before selectionStart and check if it is a new line
      var previousChar = element.textarea[0].value.slice(element.selectionStart - 1, element.selectionStart);
      return (previousChar.match(/\n/g)) ? false : true;
    }
    return true;
  };

  function getEndLength(string) {
    // e.g. if **content** returns 2, if //content/ returns 1, if ###content returns 0
    var array = string.split('content');
    if(array.length < 2) return 0;
    return array[1].length;
  };

  MdEditor.defaults = [
    {
      action: 'heading',
      content: '###content',
      newLine: false
    },
    {
      action: 'code',
      content: '`content`',
      newLine: false
    },
    {
      action: 'link',
      content: '[content](url)',
      newLine: false
    },
    {
      action: 'blockquote',
      content: '> content',
      newLine: true
    },
    {
      action: 'bold',
      content: '**content**',
      newLine: false
    },
    {
      action: 'italic',
      content: '_content_',
      newLine: false
    },
    {
      action: 'uList',
      content: '- Item 1\n- Item 2\n- Item 3',
      newLine: true
    },
    {
      action: 'oList',
      content: '1. Item 1\n2. Item 2\n3. Item 3',
      newLine: true
    },
    {
      action: 'tList',
      content: '- [ ] Item 1\n- [x] Item 2\n- [ ] Item 3',
      newLine: true
    }
  ];

  window.MdEditor = MdEditor;
}());