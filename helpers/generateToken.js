
const generateToken = () => {
    const a = Math.random().toString(32).substr(2);
    const b = Date.now().toString(32);

    return a + b;
}
export default generateToken;