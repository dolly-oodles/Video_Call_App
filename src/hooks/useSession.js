const useSession = () => {
  const getLocalStorageData = ({ key }) => {
    return window.localStorage.getItem(key);
  };

  const setLocalStorageData = ({ key, value }) => {
    return window.localStorage.setItem(key, value);
  };
  const clearLocalStorage = () => {
    window.localStorage.clear();
  };

  return { getLocalStorageData, setLocalStorageData, clearLocalStorage };
};
export default useSession;
