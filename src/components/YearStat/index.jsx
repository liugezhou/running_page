import React from 'react';
import Stat from 'src/components/Stat';
import useActivities from 'src/hooks/useActivities';
import useHover from 'src/hooks/useHover';
import { formatPace } from 'src/utils/utils';
import styles from './style.module.scss';

const YearStat = ({ year, onClick }) => {
  let { activities: runs, years } = useActivities();
  // for hover
  const [hovered, eventHandlers] = useHover();
  // lazy Component
  const YearSVG = React.lazy(() =>
    import(`assets/year_${year}.svg`).catch(() => ({
      default: () => <div />,
    }))
  );

  if (years.includes(year)) {
    runs = runs.filter((run) => run.start_date_local.slice(0, 4) === year);
  }
  let sumDistance = 0;
  let streak = 0;
  let pace = 0;
  let paceNullCount = 0;
  let heartRate = 0;
  let heartRateNullCount = 0;
  runs.forEach((run) => {
    sumDistance += run.distance || 0;
    if (run.average_speed) {
      pace += run.average_speed;
    } else {
      paceNullCount++;
    }
    if (run.average_heartrate) {
      heartRate += run.average_heartrate;
    } else {
      heartRateNullCount++;
    }
    if (run.streak) {
      streak = Math.max(streak, run.streak);
    }
  });
  sumDistance = (sumDistance / 1000.0).toFixed(1);
  const avgPace = formatPace(pace / (runs.length - paceNullCount));
  const hasHeartRate = !(heartRate === 0);
  const avgHeartRate = (heartRate / (runs.length - heartRateNullCount)).toFixed(
    0
  );
  return (
    <div
      style={{ cursor: 'pointer' }}
      onClick={() => onClick(year)}
      {...eventHandlers}
    >
      <section className={styles.section}>
        <Stat value={year} description=" Run" />
        <Stat value={runs.length} description=" 次" className={styles.stat}/>
        <Stat value={sumDistance} description=" KM" className={styles.stat}/>
        <Stat value={avgPace} description=" 配速" className={styles.stat}/>
        <Stat
          value={`${streak} 天`}
          description=" 连续"
          className={styles.stat}
        />
        {hasHeartRate && (
          <Stat value={avgHeartRate} description=" 平均心率" className={styles.stat} />
        )}
      </section>
      {hovered && (
        <React.Suspense fallback="loading...">
          <YearSVG className={styles.yearSVG} />
        </React.Suspense>
      )}
      <hr color="Gold" />
    </div>
  );
};

export default YearStat;
