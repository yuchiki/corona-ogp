import { existsSync, mkdirSync, writeFileSync, readdirSync, unlinkSync, statSync } from 'fs';
import { InfoByDay } from './InfoByDay';
import { ChartCallback, ChartJSNodeCanvas } from 'chartjs-node-canvas';

const WIDTH = 400;
const HEIGHT = 400;

export const generate = async (infos: InfoByDay[], dir: string): Promise<string> => {
  const imageDirPath = ensureExistDir(dir);
  const filename = infosRangeToFilename(infos)
  const filepath = `${imageDirPath}/${filename}`;

  const image = await render(infos);
  writeFileSync(filepath, image);
  setTimeout(() => { try { removeExceptLatestN(imageDirPath, 1) } catch(e) {} }, 60 * 1000);
  return filename;
}

const ensureExistDir = (dirPath: string): string => {
  if (!existsSync(dirPath)) {
    mkdirSync(dirPath);
  }
  return dirPath;
};

const render = async (infos: InfoByDay[]) => {
  const chartCallback = () => {}
  const width = WIDTH;
  const height = HEIGHT;
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];
  const chartJSNodeCanvas = new ChartJSNodeCanvas({ width, height, chartCallback});
  const configuration = {
    type: 'bar',
    data: {
      labels: infos.map(info => `${info.date.getDate()}日(${weekDays[info.date.getDay()]})`),
      datasets: [{
        'label': '先週比増加割合',
        data: infos.map(info => info.ratio * 100 - 100),
        backgroundColor: infos.map(info => info.ratio > 1 ? '#FF5E5B' : '#3F88C5')
      }]
    },
    options: {
      scales: {
        yAxes: {
          labelString: '増加分[%]',
          suggestedMin: -100,
          suggestedMax: 100,
        }
      }
  }
  };
  const image = await chartJSNodeCanvas.renderToBuffer(configuration as any);
  return image;
}

const infosRangeToFilename = (infos: InfoByDay[]): string => {
  const head = infos[0];
  const last = infos[infos.length-1];
  return `${formatDate(head.date)}_${formatDate(last.date)}.png`
};

const formatDate = (dt: Date): string => {
  var y = dt.getFullYear();
  var m = ('00' + (dt.getMonth()+1)).slice(-2);
  var d = ('00' + dt.getDate()).slice(-2);
  return (y + '-' + m + '-' + d);
};

const removeExceptLatestN = async (dirPath: string, n: number): Promise<void> => {
  const filepaths = readdirSync(dirPath).map((filename) => `${dirPath}/${filename}`);
  const files = await Promise.all(
    filepaths.map(filepath => {
      return {filepath, timestamp: statSync(filepath).birthtimeMs}
    }));

  files
    .sort(({timestamp: t1}, {timestamp: t2}) => t1 - t2)
    .slice(0, -n)
    .forEach(({filepath}) => unlinkSync(filepath));
};
