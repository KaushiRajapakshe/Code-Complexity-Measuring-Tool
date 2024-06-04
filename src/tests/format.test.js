const chai = require('chai');
const { formatCode } = require('../controllers/fileController');
const { expect } = chai;

describe('Code Formatting', () => {
  it('should format Java code correctly', async () => {
    const unformattedCode = `
      public class Test {
      public static void main(String[] args){
      System.out.println("Hello World");}
      }
    `;

    const expectedFormattedCode = `
public class Test {
    public static void main(String[] args) {
        System.out.println("Hello World");
    }
}
`; // This is an example; adjust based on your formatter's output

    const formattedCode = await formatCode(unformattedCode);
    expect(formattedCode.trim()).to.equal(expectedFormattedCode.trim());
  });
});

