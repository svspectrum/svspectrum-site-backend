module.exports = () => ({
    placeholder: {
        enabled: true,
        config: {
            size: 10,
        },
    },
    ckeditor: {
        enabled: true,
        config: {
            plugin: {
                
            },
            editor: { // editor default config
                // https://ckeditor.com/docs/ckeditor5/latest/features/markdown.html
                // if you need markdown support and output set it to removePlugins: [''],
                // default is removePlugins: ['Markdown'],
                removePlugins: [
                    'Markdown', 
                    'Alignment', 'Code', 'CodeBlock', 'FontBackgroundColor', 'FontColor', 'FontFamily', 'FontSize', 'Highlight', 
                    'HorizontalLine', 'HtmlComment', 'HtmlEmbed', 'Indent', 'IndentBlock', 'PageBreak', 'SourceEditing',
                ],
                // https://ckeditor.com/docs/ckeditor5/latest/features/toolbar/toolbar.html
                toolbar: {
                    items: [
                        'heading',
                        // 'paragraph',
                        // 'heading1',
                        // 'heading2',
                        '|',
                        'bold',
                        'italic',
                        'underline',
                        'strikethrough',
                        'removeFormat',
                        '|',
                        'bulletedList',
                        'numberedList',
                        'insertTable',
                        '|',
                        'link',
                        'StrapiMediaLib',
                        'mediaEmbed',
                        'blockQuote',
                        '|',
                        'undo',
                        'redo'
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/font.html
                // fontSize: {
                //     options: [
                //         9,
                //         11,
                //         13,
                //         'default',
                //         17,
                //         19,
                //         21,
                //         27,
                //         35,
                //         "tiny",
                //         "small",
                //         "big",
                //         "huge"
                //     ],
                //     supportAllValues: false
                // },
                // fontFamily: {
                //     options: [
                //         'default',
                //         'Arial, Helvetica Neue, Helvetica, Source Sans Pro, sans-serif',
                //         'Courier New, Courier, monospace',
                //         'Georgia, serif',
                //         'Lucida Sans Unicode, Lucida Grande, sans-serif',
                //         'Tahoma, Geneva, sans-serif',
                //         'Times New Roman, Times, serif',
                //         'Trebuchet MS, Helvetica, sans-serif',
                //         'Verdana, Geneva, sans-serif',
                //         'Roboto, Roboto Black, Roboto Medium, Roboto Light, sans-serif',
                //     ],
                //     supportAllValues: true
                // },
                // fontColor: {
                //     columns: 5,
                //     documentColors: 10,
                // },
                // fontBackgroundColor: {
                //     columns: 5,
                //     documentColors: 10,
                // },
                // https://ckeditor.com/docs/ckeditor5/latest/features/ui-language.html
                language: 'nl',
                // https://ckeditor.com/docs/ckeditor5/latest/features/images/images-overview.html
                image: {
                    resizeUnit: "%",
                    resizeOptions: [ {
                        name: 'resizeImage:original',
                        value: null,
                        icon: 'original'
                    },
                    {
                        name: 'resizeImage:25',
                        value: '25',
                        icon: 'small'
                    },
                    {
                        name: 'resizeImage:50',
                        value: '50',
                        icon: 'medium'
                    },
                    {
                        name: 'resizeImage:75',
                        value: '75',
                        icon: 'large'
                    } ],
                    toolbar: [
                        'toggleImageCaption',
                        'imageTextAlternative',
                        'imageStyle:inline',
                        'imageStyle:block',
                        'imageStyle:side',
                        'linkImage',
                        'resizeImage:25', 'resizeImage:50', 'resizeImage:75', 'resizeImage:original'
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/table.html
                table: {
                    contentToolbar: [
                        'tableColumn',
                        'tableRow',
                        'mergeTableCells',
                        'tableCellProperties',
                        'tableProperties',
                        'toggleTableCaption'
                    ]
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/headings.html
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                        { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                        { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                        { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                        { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' },
                    ]
                },
                mediaEmbed: {
                    previewsInData: true,
                },
                // https://ckeditor.com/docs/ckeditor5/latest/features/general-html-support.html
                // if you need more tags
                // htmlSupport: {
                //     allow: [
                //         // Enables plain <div> elements.
                //         {
                //             name: 'div'
                //         },
                
                //         // Enables plain <div>, <section> and <article> elements.
                //         {
                //             name: /^(div|section|article)$/
                //         },
                
                //         // Enables <div>s with all inline styles (but no other attributes).
                //         {
                //             name: 'div',
                //             styles: true
                //         },
                
                //         // Enables <div>s with foo and bar classes.
                //         {
                //             name: 'div',
                //             classes: [ 'foo', 'bar' ]
                //         },
                
                //         // Adds support for `foo` and `bar` classes to the already supported
                //         // <p> elements (those are enabled by the dedicated paragraph feature).
                //         {
                //             name: 'p',
                //             classes: [ 'foo', 'bar' ]
                //         },
                
                //         // Enables <div>s with foo="true" attribute and bar attribute that
                //         // can accept any value (boolean `true` value works as an asterisk).
                //         {
                //             name: 'div',
                //             attributes: {
                //                 foo: 'true',
                //                 bar: true
                //             }
                //         },
                
                //         // Adds support for style="color: *" to the already supported
                //         // <p> and <h2-h4> elements.
                //         {
                //             name: `/^(p|h[2-4])$/'`,
                //             styles: { 'color': true }
                //         },
                //     ]
                // },
            }
        }
    }
})