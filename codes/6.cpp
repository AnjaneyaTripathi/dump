class Solution {
public:
    string convert(string s, int numRows) {
        if(numRows==1) return s;
        string res;
        int n=numRows-1;
        int l=2*n, i, k, c;
        c=l;
        do {
            if(l==0 || l==c) l=c;
            k=l;
            k=abs(c-k);
            for(i=numRows-n-1; i<s.length(); i+=k) {
                cout<<s[i];
                res.push_back(s[i]);
                if(k==0 || k==c) k=c;
                else k=abs(c-k);
            }
            l-=2;
        } while(n--);
        return res;
    }
};