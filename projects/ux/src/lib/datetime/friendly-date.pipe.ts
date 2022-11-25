import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gdFriendlyDate',
  pure: true,
})
export class FriendlyDatePipe implements PipeTransform {
  public transform(
    value: string | Date,
    format: 'short' | 'long' = 'long'
  ): string {
    const date = typeof value === 'string' ? new Date(value) : value;
    const now = new Date();

    const seconds = Math.round(
      Math.abs((now.getTime() - date.getTime()) / 1000)
    );

    if (Number.isNaN(seconds)) {
      return '';
    }

    if (seconds < 60) {
      return `${seconds}${
        format === 'long'
          ? seconds === 1
            ? ' second ago'
            : ' seconds ago'
          : 's'
      }`;
    }

    const minutes = Math.round(Math.abs(seconds / 60));

    if (minutes < 60) {
      return `${minutes}${
        format === 'long'
          ? minutes === 1
            ? ' minute ago'
            : ' minutes ago'
          : 'm'
      }`;
    }

    const hours = Math.round(Math.abs(minutes / 60));

    if (hours < 24) {
      return `${hours}${
        format === 'long' ? (hours === 1 ? ' hour ago' : ' hours ago') : 'h'
      }`;
    }

    const days = Math.round(Math.abs(hours / 24));

    if (days < 365) {
      return `${days}${
        format === 'long' ? (days === 1 ? ' day ago' : ' days ago') : 'd'
      }`;
    }

    const years = Math.round(Math.abs(days / 365));

    return `${years}${
      format === 'long' ? (years === 1 ? ' year ago' : ' years ago') : 'y'
    }`;
  }
}
