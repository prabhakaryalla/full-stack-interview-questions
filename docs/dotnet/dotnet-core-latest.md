<details>
<summary><b>Can you explain how multiple authorization policies can be combined or chained in ASP.NET Core?</b></summary>
<pre><b>
Approach                                    Logic Type      Description</b>
Single policy with multiple requirements    AND             All requirements must succeed
Multiple [Authorize] attributes             OR              Any policy success grants access
Custom requirement & handler                AND/OR          Custom complex logic
Programmatic checks                         AND/OR          Fine-grained control in code
</pre>
</details>





