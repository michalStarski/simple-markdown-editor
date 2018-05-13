$(document).ready(function(){
  MarkdownTranslator.loadLocalStorage();
});

const MarkdownTranslator = {
  regex: {
    bold: /\*\*([\s\S]+?)\*\*/g,
    italics: /_([\s\S]+?)_/g,
    anchor: /\[([\s\S]*?)]\(([\s\S]*?)\)/g,
    enter: /\n/g,
    scratch: /~~([\s\S]*?)~~/g,
    listItem: /\* ([\s\S]*?)(\n|$)/g,
    listItemContainer: /<li>(.*)<\/li>/g,
  },

  defaultText: `#Weekly JavaScript Challenge #9
##Simple Markdown Editor
**to get started simply start writing ...**
~~it's super hard~~

_Avaliable tools_:
* headers
* bold text
* italics
* strikethrough
* list
* links
[github:](https://github.com/michalStarski)`,

  transform: function(string) {
    for(let i = 6; i >= 1; i--){
      string = string.replace(new RegExp(`#{${i}}(.+)`, `g`), `<h${i}>$1</h${i}>`);
    }
    string = string.replace(this.regex.bold, "<strong>$1</strong>")
      .replace(this.regex.listItem, "<li>$1</li>")
      .replace(this.regex.listItemContainer, "<ul><li>$1</ul>")
      .replace(this.regex.italics, "<em>$1</em>")
      .replace(this.regex.anchor, "<a href='$2''>$1</a>")
      .replace(this.regex.scratch, "<s>$1</s>")
      .replace(this.regex.enter, "<br/>");

    return string;
  },

  loadLocalStorage: function(){
    if(!localStorage.getItem('document') || localStorage.getItem('document') === '')
      localStorage.setItem('document', this.defaultText);
    $("textarea[name='editor']").val(localStorage.getItem('document'));
    $("#preview-window").append(MarkdownTranslator.transform(localStorage.getItem('document')));
  }


};

$(window).on('input', function(){
    $('#preview-window').empty().append(MarkdownTranslator.transform(event.target.value));
    localStorage.setItem('document', event.target.value);
});
