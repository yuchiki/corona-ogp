set terminal png
set output 'public/barChart.png'

set style fill solid border lc rgb "black"
plot "data.dat" using 0:2 with boxes notitle lc rgb "red"
