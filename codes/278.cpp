// The API isBadVersion is defined for you.
// bool isBadVersion(int version);

class Solution {
public:
    int checkVersion(int n, int l, int h) {
        if(l==h) return h;
        if(isBadVersion(l+(h-l)/2)) {
            cout<<"low"<<l+(h-l)/2<<endl;
            return checkVersion(0, l, l+(h-l)/2);
        } else {
            cout<<"high"<<l+(h-l)/2<<endl;
            if(l+(h-l)/2==l) return h;
            return checkVersion(1, l+(h-l)/2, h);
        }
    }
    
    int firstBadVersion(int n) {
        int l=1, h=n;
        if(isBadVersion(l+(h-l)/2)) {
            cout<<l+(h-l)/2<<endl;
            return checkVersion(0, l, l+(h-l)/2);
        } else {
            cout<<"high"<<l+(h-l)/2<<endl;
            return checkVersion(1, l+(h-l)/2, h);
        }
    }
};