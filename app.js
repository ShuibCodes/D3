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

// 1.

const svg = d3.select('.canvas')
    .append('svg')
    .attr('width', 600)
    .attr('height', 600)

/// 2 . create margins and dimensions 
// setting margin width and heights
const margin = {top:20 , right:20, bottom: 100, left: 100}
// our svg width and hieght was set above: 600's. We need to minus our overall width/height from the specified margins to get the graph width/height 
const graphWidth = 600 - margin.left - margin.right 
const graphHeight = 600 - margin.top - margin.bottom 




// 7. grouping it so we can tranlsate whole graph 
const graph = svg.append('g')
        .attr('width', graphWidth)
        .attr('height', graphHeight)
        .attr('transform', `translate(${margin.left}, ${margin.top})`)


        // 8. grouping x-axis and y-axis, so it moves with the graph.
        const xAxisGroup = graph.append('g')
            .attr('transform', `translate(0, ${graphHeight})`)

        const yAxisGroup = graph.append('g')




d3.json('menu.json').then( data =>{

// 6. scalling down the long bars with a liner scale
    const y = d3.scaleLinear()
        .domain([0,  d3.max(data, d =>d.orders)])
            // in this order to so it goes from 0 - 1500 orders
        .range([graphHeight, 0])



// 7. Scale Band for X-axis

    const x = d3.scaleBand()
                .domain(data.map(item => item.name))
                .range([0,500])
                .paddingInner(0.2)
                .paddingOuter(0.2)

// 3. join the data to rect

    const rects = graph.selectAll('rect')
        .data(data);

    // 4. update rect in the dom 
    rects.attr('width', x.bandwidth)
        // pass order value thru the ScaleLiner
        .attr('height', d => graphHeight - y(d.orders))
        .attr('fill', 'orange')
        .attr('x', d => (d.name))
        .attr('y', d => y(d.orders))

    // 5.  append the enter selection to the dom 
    rects.enter()
        .append('rect')
        .attr('height', d => graphHeight -  y(d.orders))
        .attr('width', x.bandwidth)
        .attr('fill', 'orange')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.orders))



    // 9. create and call the axis

    const xAxis= d3.axisBottom(x)
    const yAxis = d3.axisLeft(y)
    .ticks(4)
    .tickFormat(d => d +  '   '  + ' orders ');


    // 10. generate svg's and add them to groups
    xAxisGroup.call(xAxis)
    yAxisGroup.call(yAxis)

    //formatting ticks


});