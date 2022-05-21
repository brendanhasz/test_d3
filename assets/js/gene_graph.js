function redrawGraph(id, gene_expression, displayed_genes){

    // set the dimensions and margins of the graph
    const margin = {top: 30, right: 30, bottom: 70, left: 60};
    const width = 460 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    // Clear the existing chart
    d3.select(id).selectAll("svg").remove();

    // Colors
    colors = ["#E69F00", "#56B4E9", "#009E73", "#F0E442", "#0072B2", "#D55E00", "#CC79A7"];

    // Create data to plot
    var i = 0;
    var max_expression = 0;
    var data = Array();
    for (let gene of displayed_genes) {
        data.push(
            {
                "gene_name": gene,
                "gene_expression": gene_expression[gene],
                "index": i,
                "color": colors[i]
            }
        )
        if (gene_expression[gene] > max_expression) {
            max_expression = gene_expression[gene];
        }
        i++;
    }

    console.log("Plotting:");
    console.log(data);

    // Create the chart SVG using ObservableHQ function
    chart = BarChart(
        data,
        {
            x: d => d.gene_name,
            y: d => d.gene_expression,
            yFormat: ".1f",
            yLabel: "Gene expression",
            width: 600,
            height: 500,
            color: d => d.color,  //doesn't work
            duration: 750 // slow transition for demonstration
        }
    )

    document.getElementById(id.slice(1)).appendChild(chart);

}
