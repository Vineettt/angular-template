export class Utility {
  static validateObjectEmpty(obj: any) {
    let flag = false;
    for (const key in obj) {
      if (obj[key]?.length === 0) {
        flag = true;
      }
    }
    return flag;
  }

  static async validateArrayEmpty(arr: any){
    let flag = false;
    for (const itr of arr) {
        let res = await this.validateObjectEmpty(itr);
        if(res){
            flag = true;
        }
    }
    return flag
  }

  static onlyInLeft = (
    left: any[],
    right: any[],
    compareFunction: (arg0: any, arg1: any) => any
  ) =>
    left.filter(
      (leftValue: any) =>
        !right.some((rightValue: any) => compareFunction(leftValue, rightValue))
    );
}
