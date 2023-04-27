import Result "mo:base/Result";

module Types {

    public type Result<T, E> = Result.Result<T, E>;
    public type KeyId = Text;
    public type KeyBody = Text;

}