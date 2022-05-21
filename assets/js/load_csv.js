function loadCSV(path){

    // Load the file
    var client = new XMLHttpRequest();
    client.open("GET", path, false);
    client.send();
    var raw_text = client.responseText;

    // Parse the file
    var gene_expression = {};
    var text_lines = raw_text.split('\n');
    for (var i = 1; i < text_lines.length-1; i++) {
        var this_line = text_lines[i].split(',')
        gene_expression[this_line[0]] = parseFloat(this_line[1]);
    }

    return gene_expression

}
