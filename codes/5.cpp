class Solution {
public:
    string longestPalindrome(string s) {
        // int n=s.length(), i, maxlen=0, maxidx=0, k=2;
        // vector<vector <int>>  mat(n, vector <int> (n, 0));
        // for(i=0; i<n; i++) {
        //     mat[i][i]=1;
        // }
        // for(i=0; i<n-1; i++) {
        //     if(s[i]==s[i+1]) {
        //         maxlen=1;
        //         maxidx=i;
        //         mat[i][i+1]=1;
        //     }
        // }
        // while(k<n) {
        //     for(i=0; i<n-k; i++) {
        //         if(mat[i+1][i+k-1]==1 && s[i]==s[i+k]) {
        //             maxlen=k;
        //             maxidx=i;
        //             mat[i][i+k]=1;
        //         }
        //     }
        //     k++;
        // }
        // return s.substr(maxidx, maxlen+1);
        int r, l, maxlen=1, maxidx=0, i=0, len=s.length();
        while(i<len) {
            l=i;
            r=i;
            while(r<len-1 && s[r]==s[r+1]) r++; // to find the middle of the palindrome with repeating characters
            i=r+1; // skip all the duplicates [they have been accounted for in above line]
            while(l>0 && r<len-1 && s[r+1]==s[l-1]) {
                l-=1;
                r+=1;
            }
            if((r-l+1)>maxlen) {
                maxlen=r-l+1;
                maxidx=l;
            }
        }
        return s.substr(maxidx, maxlen);
    }
};