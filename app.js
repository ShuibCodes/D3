// const canvas = d3.select('.canvas')
// // append svg to canvas
// // applying hieght attr to svg's 

// const svg = canvas.append('svg')
//         .attr('height', 600)
//         .attr('width', 600);

//   // grouping elements 
// // now can directly transform geoup 
//   const group = svg.append('g')
//   // translate whole group down by 100px
//         .attr('transform', 'translate(0,100)')


// // append shapes to svg container 
// group.append('rect')
//     .attr('width', 200)
//     .attr('height' , 100)
//     .attr('fill', 'blue')
//     .attr('x', 20)
//     .attr('y', 20);


// group.append('circle')
//     .attr('r', 50)
//     .attr('cx', 300)
//     .attr('cy', 70)
//     .attr('fill', 'pink');

// group.append('line')
//     .attr('x1', 370)
//     .attr('x2', 400)
//     .attr('y1', 20)
//     .attr('y2', 120)
//     .attr('stroke', 'black').attr('stroke-width', 3)


// svg.append('text')
//     // where on screen will text appear on x direction
//     .attr('x', 20)
//     .attr('y', 200)
//     .attr('fill', 'grey')
//     .text('hello world')
//     .style('font-family', 'arial');

// reference svg to start with 

// const data = [ 
//     {width: 200, height: 100, fill: 'purple'},
//     {width: 100, height: 60, fill: 'pink'},
//     {width: 50, height: 30, fill: 'red'}
//  ];


// const svg = d3.select('svg');

//  console.log(d3.selectAll('rect').data(data))

// const rects = svg.selectAll('rect')
// // adding data
//     .data(data)
//     // adding attributes 
//     .attr('width', (d , i , n) =>d.width)
//     .attr('height', d => d.height)
//     .attr('fill', d =>  d.fill )


//  // al this is updating everything that hans't entered the DOM (Enter Selection shapes)

// rects.enter()
//     .append('rect')
//     .attr('width', (d , i , n) =>d.width)
//     .attr('height', d => d.height)
//     .attr('fill', d =>  d.fill )



// const svg = d3.select('svg');

// // grabbing data
// d3.json('planet.json').then(data =>{
//     // just joining data to circs
//     const circs = svg.selectAll('circle')
//     .data(data);

//     // add attrs to circs already in DOMN 
//     circs.attr('cy', 200)
//     .attr('cx', d => d.distance)
//     .attr('r', d => d.radius)
//     .attr('fill' , d => d.fill)

// // append the enter selection to the DOM

//     circs.enter()
//         .append('circle')  .attr('cx', d => d.distance)
//         .attr('cy', 200) 
//         .attr('r', d => d.radius)
//         .attr('fill' , d => d.fill)

// })

const svg = d3.select('svg')

d3.json('menu.json').then( data =>{

// scalling down the long bars with a liner scale
    const y = d3.scaleLinear()
        .domain([0,1000])
        .range([0,500]);


    // join the data to rect

    const rects = svg.selectAll('rect')
        .data(data);

    // update rect in the dom 
    rects.attr('width', 50)
        // pass order value thru the ScaleLiner
        .attr('height', d => y(d.orders))
        .attr('fill', 'orange')
        .attr('x', (d,i) => i * 70)
    // append the enter selection to the dom 
    rects.enter()
        .append('rect')
        .attr('height', d => y(d.orders))
        .attr('width',50 )
        .attr('fill', 'orange')
        .attr('x', (d,i) => i * 70)

});