/* Page load tasks and callbacks */

// Load the CSV
var gene_expression = loadCSV("data/data.csv");
// NOTE: Need to use nonlocal link below when developing, otherwise CORS errors :roll_eyes:
//var gene_expression = loadCSV("https://raw.githubusercontent.com/brendanhasz/test_d3/main/data/data.csv");

// Keep track of which genes are being displayed
var displayed_genes = new Set();

// Set the autocomplete candidates to the gene names
autocomplete(document.getElementById("geneInput"), Object.keys(gene_expression));


/* Update the displayed list of genes */
function updateGeneTagList(genes) {
    var genes_div = document.getElementById("displayed_genes");
    genes_div.innerHTML = "";
    for (let gene of genes) {
        genes_div.innerHTML += `<a onclick=\"removeGene('${gene}')\" style=\"cursor: pointer;\" class=\"genetag\"> ${gene} <span style=\"color:red\">&#10006</span> </a>`;
    }
}


/* Add a gene to the plot */
function addGene() {
    
    // Add gene to internal list of displayed genes
    var gene_to_add = document.getElementById("geneInput").value;
    console.log(`Adding gene ${gene_to_add}`);
    if (gene_to_add.length < 1) return false;
    if (!displayed_genes.has(gene_to_add)) {
        displayed_genes.add(gene_to_add);
    }
    console.log("Updated list of genes:");
    console.log(displayed_genes);

    // Add to displayed list
    updateGeneTagList(displayed_genes);

    // Reset and redraw graph
    redrawGraph("#bar_chart", gene_expression, displayed_genes)

    // Reset input
    document.getElementById("geneInput").value = "";
}


/* Remove a gene from the plot */
function removeGene(gene_to_remove) {
    
    // Remove gene from list of displayed genes
    console.log(`Removing gene ${gene_to_remove}`);
    displayed_genes.delete(gene_to_remove)
    console.log(`Updated list of genes: ${displayed_genes}`);

    // Add to displayed list
    updateGeneTagList(displayed_genes);

    // Reset and redraw graph
    redrawGraph("#bar_chart", gene_expression, displayed_genes)

    // Reset input
    document.getElementById("geneInput").value = "";
}
