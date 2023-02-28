import Board from "../../components/board/board";
import {
  checkColumn,
  checkDiagonal,
  checkRow,
  getBoardNumbers,
  getNumberFromRange,
  transpose,
} from "./utils";
import {
  mockWonBoardColumn,
  mockWonBoardDiagonal,
  mockWonBoardRow,
} from "./utils.mock";

describe("utils", () => {
  describe("getNumberFromRange", () => {
    it("should return a number in the range", () => {
      const max = 10;
      const number = getNumberFromRange(max, []);
      expect(number).toBeLessThan(max);
    });

    it("should not return a number in the exclusion", () => {
      const exclusion = [0, 1, 2, 4];
      const number = getNumberFromRange(5, exclusion);
      expect(number).toBe(3);
    });
  });

  describe("transpose", () => {
    it("should transpose a matrix", () => {
      const matrix = [
        [1, 2, 3],
        [4, 5, 6],
      ];
      const transposed = transpose(matrix);
      expect(transposed).toEqual([
        [1, 4],
        [2, 5],
        [3, 6],
      ]);
    });
  });

  describe("getBoardNumbers", () => {
    it("should generate a board that satisfies the criteria", () => {
      const boardNumbers = getBoardNumbers();
      // transpose back to test the criteria
      const transposed = transpose(boardNumbers);
      expect(transposed[0].every((number) => number <= 15)).toBeTruthy();
      expect(
        transposed[1].every((number) => number > 15 && number <= 30)
      ).toBeTruthy();
      expect(
        transposed[2].every((number) => number > 30 && number <= 45)
      ).toBeTruthy();
      expect(
        transposed[3].every((number) => number > 45 && number <= 60)
      ).toBeTruthy();
      expect(
        transposed[4].every((number) => number > 60 && number <= 75)
      ).toBeTruthy();
    });
  });

  describe("checkRow", () => {
    it("should tell if board wins by row", () => {
      const mockBoard = mockWonBoardRow;
      const check_1 = checkRow(mockBoard, 0);
      const check_2 = checkRow(mockBoard, 10);
      expect(check_1).toBeTruthy();
      expect(check_2).toBeFalsy();
    });

    it("should tell if board wins by column", () => {
      const mockBoard = mockWonBoardColumn;
      const check_1 = checkColumn(mockBoard, 0);
      const check_2 = checkColumn(mockBoard, 6);
      expect(check_1).toBeFalsy();
      expect(check_2).toBeTruthy();
    });

    it("should tell if board wins by diagonal", () => {
      const mockBoard = mockWonBoardDiagonal;
      const check = checkDiagonal(mockBoard);
      expect(check).toBeTruthy();
    });
  });
});
