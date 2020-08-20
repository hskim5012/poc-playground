export class Validator {
  constructor() {}
  IsValidDate(date: string): Date {
    if (date !== undefined && date !== null && date !== '') {
      const parts = date.split('/');
      if (parts[0].length === 4) {
        return null;
      }
      if (
        parts.length === 3 &&
        (parts[0].length === 2 || parts[0].length === 1) &&
        (parts[1].length === 2 || parts[1].length === 1) &&
        parts[2].length === 4
      ) {
        const dt = new Date(
          parseInt(parts[2], 10),
          parseInt(parts[1], 10) - 1,
          parseInt(parts[0], 10)
        );
        return dt;
      }
    }
    return null;
  }
}
