
import React from 'react';
import { Editor } from '@tinymce/tinymce-react'; 

class EditorInquiries extends React.Component {


  handleSelectionChange = (e,editor) => {
       
  } 

  handleEditorChange = (e) => {
    /*
    console.log(
      'Content was updated:',
      e.target.getContent()
    );
    */
  }


  render() {
    let results = [
      { value: "select" },
      { value: "from" },
      { value: "update" },
      { value: "insert" },
      { value: "delete" },
      { value: "values" },
      { value: "with" },
      { value: "as" },
      { value: "getdate" },
      { value: "and" },
      { value: "alter" },
      { value: "drop" },
      { value: "create" },
      { value: "grant" },
      { value: "exec" },
      { value: "procedure" },
      { value: "table" },
      { value: "between" },
      { value: "when" },
      { value: "where" },
      { value: "then" },
      { value: "case" },
      { value: "count" },
      { value: "group" },
      { value: "by" },
      { value: "join" },
      { value: "left" },
      { value: "right" },
      { value: "is" },
      { value: "not" },
      { value: "null" },
      { value: "like" },
      { value: "limit" },
      { value: "max" },
      { value: "min" },
      { value: "or" },
      { value: "order" },
      { value: "outer" },
      { value: "inner" },
      { value: "round" },
      { value: "distinct" },
      { value: "avg" },
      { value: "sum" },
      { value: "having" },
    ];



    return (
      <Editor
        selector="textarea"
        theme="modern"
        initialValue=""
        apiKey="na85pszgzw4brxjs8mnq0p73e81gq0e0jw8bbkqfqmnxdar4"
        init={{
          oninit: "setPlainText",
          height: 200,
          width: "100%",
          menubar: false,
          setup: function (editor) {
            var onAction = function (autocompleteApi, rng, value) {
              editor.selection.setRng(rng);
              editor.insertContent(value);
              autocompleteApi.hide();
            }

            var getSQLSentences = function (pattern) {
              return results.filter(function (text) {

                return text.value.startsWith(pattern, 0);

              });
            }


            /* An autocompleter that allows you to insert special characters */
            editor.ui.registry.addAutocompleter('sentences', {
              ch: ':',
              minChars: 2,
              columns: '1',
              onAction: onAction,
              fetch: function (pattern) {
                return new Promise(function (resolve) {
                  var results = getSQLSentences(pattern).map(function (text) {
                    return {
                      type: 'autocompleteitem',
                      value: text.value,
                      text: text.value,
                      icon: text.value
                    }
                  });

                  results.sort(function (a, b) {
                    let x = a.text.toLowerCase();
                    let y = b.text.toLowerCase();
                    if (x < y) {
                      return -1;
                    }
                    if (x > y) {
                      return 1;
                    }
                    return 0;
                  });

                  resolve(results);
                })


              }
            });


          },
          plugins: [
            'paste searchreplace textpattern'
          ],
          textpattern_patterns: [
            { start: '/*', end: '*/', format: 'italic' },
            { start: 'qbasic', replacement: 'select top 10   from   with(nolock) where   ' },
            { start: 'ubasic', replacement: 'update   set   with(nolock) where   ' },
            { start: 'dbasic', replacement: 'delete from   where   ' },
            { start: 'ibasic', replacement: 'insert into  ( )values( ) ' },
          ],
          paste_as_text: true,
          toolbar: 'undo redo searchreplace', 
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:12px}',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'CyCMovil',
        }}
        onChange={
          (this.props.handleEditorChange !== undefined ? this.props.handleEditorChange : this.handleEditorChange)
        }

        onSelectionChange={
          (this.props.handleSelectionChange !== undefined ? this.props.handleSelectionChange : this.handleSelectionChange)
        }
       
        
      />
    );
  }
}

export default EditorInquiries;