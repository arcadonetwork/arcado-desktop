import { Moment } from 'moment';
import { GithubActivity } from '../../utils/hallar';

export type CalendarItem = {
  index : number
  day?: Moment
  activity?: GithubActivity
}
